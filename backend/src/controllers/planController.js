const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getPlans = async (req, res) => {
  try {
    const plans = await prisma.plan.findMany({ where: { isActive: true }, orderBy: { price: 'asc' } });
    res.json({ plans });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get plans' });
  }
};

exports.getPlan = async (req, res) => {
  try {
    const { id } = req.params;
    const plan = await prisma.plan.findUnique({ where: { id } });
    if (!plan) return res.status(404).json({ error: 'Plan not found' });
    res.json({ plan });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get plan' });
  }
};

exports.createPlan = async (req, res) => {
  try {
    const { name, slug, description, systemSize, panelType, panelCapacity, panelCount, inverterType, inverterCapacity, batteryType, batteryCapacity, batteryCount, price, discountPrice, emiAvailable, emiMonths, features, isPopular } = req.body;
    const plan = await prisma.plan.create({
      data: { name, slug, description, systemSize, panelType, panelCapacity, panelCount, inverterType, inverterCapacity, batteryType, batteryCapacity, batteryCount, price, discountPrice, emiAvailable, emiMonths, features, isPopular }
    });
    res.status(201).json({ message: 'Plan created', plan });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create plan' });
  }
};

exports.updatePlan = async (req, res) => {
  try {
    const { id } = req.params;
    const plan = await prisma.plan.update({ where: { id }, data: req.body });
    res.json({ message: 'Plan updated', plan });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update plan' });
  }
};

exports.deletePlan = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.plan.update({ where: { id }, data: { isActive: false } });
    res.json({ message: 'Plan deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete plan' });
  }
};