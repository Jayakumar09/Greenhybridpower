const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createQuotation = async (req, res) => {
  try {
    const { leadId, planId, systemSize, panelDetails, inverterDetails, batteryDetails, totalPrice, discount, emiAvailable, emiPerMonth, financingInfo, validUntil } = req.body;
    const finalPrice = discount ? totalPrice - discount : totalPrice;
    const quotation = await prisma.quotation.create({
      data: { customerId: req.user.id, leadId, planId, systemSize, panelDetails, inverterDetails, batteryDetails, totalPrice, discount, finalPrice, emiAvailable, emiPerMonth, financingInfo, validUntil: validUntil ? new Date(validUntil) : null }
    });
    res.status(201).json({ message: 'Quotation created', quotation });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create quotation' });
  }
};

exports.getQuotations = async (req, res) => {
  try {
    const { page = 1, limit = 20, status, search } = req.query;
    const where = {};
    if (status) where.status = status;
    const quotations = await prisma.quotation.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: parseInt(limit),
      include: { customer: { select: { id: true, name: true, email: true } }, plan: true }
    });
    const total = await prisma.quotation.count({ where });
    res.json({ quotations, total, page: parseInt(page), totalPages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get quotations' });
  }
};

exports.getQuotation = async (req, res) => {
  try {
    const { id } = req.params;
    const quotation = await prisma.quotation.findUnique({
      where: { id },
      include: { customer: true, plan: true, lead: true }
    });
    if (!quotation) return res.status(404).json({ error: 'Quotation not found' });
    res.json({ quotation });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get quotation' });
  }
};

exports.updateQuotation = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes, ...data } = req.body;
    const quotation = await prisma.quotation.update({ where: { id }, data: { ...data, status } });
    res.json({ message: 'Quotation updated', quotation });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update quotation' });
  }
};

exports.getMyQuotations = async (req, res) => {
  try {
    const { id } = req.user;
    const quotations = await prisma.quotation.findMany({
      where: { customerId: id },
      orderBy: { createdAt: 'desc' }
    });
    res.json({ quotations });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get quotations' });
  }
};