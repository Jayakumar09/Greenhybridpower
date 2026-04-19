const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getDashboard = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1);

    const [
      totalLeads,
      newLeads,
      lastMonthLeads,
      totalBookings,
      pendingBookings,
      totalQuotations,
      totalInstallations,
      activeInstallations,
      totalPayments,
      revenue,
      pendingPayments,
      totalServiceRequests,
      openServiceRequests,
      totalCustomers
    ] = await Promise.all([
      prisma.lead.count(),
      prisma.lead.count({ where: { createdAt: { gte: monthStart } } }),
      prisma.lead.count({ where: { createdAt: { gte: lastMonthStart, lt: monthStart } } }),
      prisma.booking.count(),
      prisma.booking.count({ where: { status: 'scheduled' } }),
      prisma.quotation.count(),
      prisma.installation.count(),
      prisma.installation.count({ where: { status: 'in_progress' } }),
      prisma.payment.count(),
      prisma.payment.aggregate({ where: { status: 'completed' }, _sum: { amount: true } }),
      prisma.payment.count({ where: { status: 'pending' } }),
      prisma.serviceRequest.count(),
      prisma.serviceRequest.count({ where: { status: 'open' } }),
      prisma.customer.count()
    ]);

    const monthlyLeads = await prisma.lead.groupBy({
      by: ['createdAt'],
      where: { createdAt: { gte: new Date(today.getFullYear(), today.getMonth() - 6, 1) } },
      _count: true
    });

    const monthlyRevenue = await prisma.payment.groupBy({
      by: ['paidAt'],
      where: { status: 'completed', paidAt: { gte: new Date(today.getFullYear(), today.getMonth() - 6, 1) } },
      _sum: { amount: true }
    });

    res.json({
      stats: {
        totalLeads,
        newLeads,
        lastMonthLeads,
        totalBookings,
        pendingBookings,
        totalQuotations,
        totalInstallations,
        activeInstallations,
        totalPayments,
        revenue: revenue._sum.amount || 0,
        pendingPayments,
        totalServiceRequests,
        openServiceRequests,
        totalCustomers,
        conversionRate: totalLeads > 0 ? ((totalInstallations / totalLeads) * 100).toFixed(2) : 0
      },
      monthlyLeads,
      monthlyRevenue
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get dashboard data' });
  }
};

exports.getCustomers = async (req, res) => {
  try {
    const { page = 1, limit = 20, search } = req.query;
    const where = search ? {
      OR: [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search } }
      ]
    } : {};
    const customers = await prisma.customer.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: parseInt(limit),
      select: { id: true, name: true, email: true, phone: true, createdAt: true, _count: { select: { quotations: true, installations: true, payments: true } } }
    });
    const total = await prisma.customer.count({ where });
    res.json({ customers, total, page: parseInt(page), totalPages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get customers' });
  }
};

exports.getCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await prisma.customer.findUnique({
      where: { id },
      include: {
        addresses: true,
        leads: true,
        bookings: { orderBy: { createdAt: 'desc' }, take: 5 },
        quotations: { orderBy: { createdAt: 'desc' }, take: 5 },
        installations: { orderBy: { createdAt: 'desc' }, take: 5 },
        payments: { orderBy: { createdAt: 'desc' }, take: 5 },
        serviceRequests: { orderBy: { createdAt: 'desc' }, take: 5 }
      }
    });
    if (!customer) return res.status(404).json({ error: 'Customer not found' });
    res.json({ customer });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get customer' });
  }
};

exports.createCustomer = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    const bcrypt = require('bcryptjs');
    const hashedPassword = await bcrypt.hash(password, 12);
    const customer = await prisma.customer.create({
      data: { name, email, password: hashedPassword, phone }
    });
    res.status(201).json({ message: 'Customer created', customer: { id: customer.id, name: customer.name, email: customer.email } });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create customer' });
  }
};

exports.getActivityLogs = async (req, res) => {
  try {
    const logs = await prisma.activityLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100
    });
    res.json({ logs });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get activity logs' });
  }
};