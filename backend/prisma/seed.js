const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create Admin
  const adminPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'Admin@123', 12);
  const admin = await prisma.admin.upsert({
    where: { email: process.env.ADMIN_EMAIL || 'admin@greenhybridpower.in' },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL || 'admin@greenhybridpower.in',
      password: adminPassword,
      name: 'Admin',
      role: 'admin'
    }
  });
  console.log('Admin created:', admin.email);

  // Create Plans
  const plans = [
    {
      name: 'Basic Solar',
      slug: 'basic-solar',
      description: 'Affordable solar PV system for homes up to 2BHK. Perfect for reducing electricity bills.',
      systemSize: '2kW',
      panelType: 'Monocrystalline',
      panelCapacity: '545W',
      panelCount: 4,
      inverterType: 'String Inverter',
      inverterCapacity: '2kW',
      price: 85000,
      discountPrice: 75000,
      emiAvailable: true,
      emiMonths: 36,
      features: '2kW Solar Panel, 2kW Inverter, Mono Perc Cells, 5-Year Warranty',
      isPopular: false,
      isActive: true
    },
    {
      name: 'Hybrid Solar',
      slug: 'hybrid-solar',
      description: 'Complete solar solution with battery backup. Uninterrupted power even during outages.',
      systemSize: '3kW',
      panelType: 'Monocrystalline',
      panelCapacity: '545W',
      panelCount: 6,
      inverterType: 'Hybrid Inverter',
      inverterCapacity: '3kW',
      batteryType: 'Li-Ion',
      batteryCapacity: '5kWh',
      batteryCount: 1,
      price: 165000,
      discountPrice: 145000,
      emiAvailable: true,
      emiMonths: 36,
      features: '3kW Solar Panel, 3kW Hybrid Inverter, 5kWh Battery Backup, Auto Switchover, 10-Year Warranty',
      isPopular: true,
      isActive: true
    },
    {
      name: 'Premium Solar',
      slug: 'premium-solar',
      description: 'Premium solar solution with high-capacity battery for complete energy independence.',
      systemSize: '5kW',
      panelType: 'Monocrystalline',
      panelCapacity: '545W',
      panelCount: 10,
      inverterType: 'Premium Hybrid',
      inverterCapacity: '5kW',
      batteryType: 'Li-Ion',
      batteryCapacity: '10kWh',
      batteryCount: 1,
      price: 275000,
      discountPrice: 245000,
      emiAvailable: true,
      emiMonths: 48,
      features: '5kW Solar Panel, 5kW Premium Inverter, 10kWh Battery Backup, Smart Monitoring, 15-Year Warranty, Annual Maintenance',
      isPopular: false,
      isActive: true
    },
    {
      name: 'Commercial Solar',
      slug: 'commercial-solar',
      description: 'Large-scale solar system for commercial buildings and offices.',
      systemSize: '10kW',
      panelType: 'Monocrystalline',
      panelCapacity: '545W',
      panelCount: 20,
      inverterType: 'Commercial String',
      inverterCapacity: '10kW',
      price: 450000,
      discountPrice: 399000,
      emiAvailable: true,
      emiMonths: 48,
      features: '10kW Solar Panel, 10kW Commercial Inverter, Ground Mount, 20-Year Warranty',
      isPopular: false,
      isActive: true
    }
  ];

  for (const plan of plans) {
    await prisma.plan.upsert({
      where: { slug: plan.slug },
      update: plan,
      create: plan
    });
  }
  console.log('Plans created');

  console.log('Database seeding completed!');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });