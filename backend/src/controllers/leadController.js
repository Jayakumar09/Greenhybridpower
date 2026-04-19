const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createLead = async (req, res) => {
  try {
    const { name, email, phone, alternatePhone, address, city, state, pincode, systemSize, budget, roofType, avgBill, source } = req.body;
    const lead = await prisma.lead.create({
      data: { name, email, phone, alternatePhone, address, city, state, pincode, systemSize, budget, roofType, avgBill, source }
    });
    res.status(201).json({ message: 'Enquiry submitted', lead });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create lead' });
  }
};

exports.getLeads = async (req, res) => {
  try {
    const { page = 1, limit = 20, status, search } = req.query;
    const where = {};
    if (status) where.status = status;
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search } }
      ];
    }
    const leads = await prisma.lead.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: parseInt(limit)
    });
    const total = await prisma.lead.count({ where });
    res.json({ leads, total, page: parseInt(page), totalPages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get leads' });
  }
};

exports.getLead = async (req, res) => {
  try {
    const { id } = req.params;
    const lead = await prisma.lead.findUnique({ where: { id }, include: { customer: true } });
    if (!lead) return res.status(404).json({ error: 'Lead not found' });
    res.json({ lead });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get lead' });
  }
};

exports.updateLead = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const lead = await prisma.lead.update({ where: { id }, data });
    res.json({ message: 'Lead updated', lead });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update lead' });
  }
};

exports.deleteLead = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.lead.delete({ where: { id } });
    res.json({ message: 'Lead deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete lead' });
  }
};

exports.getMyLeads = async (req, res) => {
  try {
    const { id } = req.user;
    const leads = await prisma.lead.findMany({ where: { customerId: id }, orderBy: { createdAt: 'desc' } });
    res.json({ leads });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get leads' });
  }
};