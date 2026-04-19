const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createServiceRequest = async (req, res) => {
  try {
    const { id } = req.user;
    const { type, issue, description, priority } = req.body;
    const serviceRequest = await prisma.serviceRequest.create({
      data: { customerId: id, type, issue, description, priority }
    });
    res.status(201).json({ message: 'Service request created', serviceRequest });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create service request' });
  }
};

exports.getServiceRequests = async (req, res) => {
  try {
    const { page = 1, limit = 20, status, priority } = req.query;
    const where = {};
    if (status) where.status = status;
    if (priority) where.priority = priority;
    const requests = await prisma.serviceRequest.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: parseInt(limit),
      include: { customer: { select: { id: true, name: true, email: true, phone: true } } }
    });
    const total = await prisma.serviceRequest.count({ where });
    res.json({ requests, total, page: parseInt(page), totalPages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get service requests' });
  }
};

exports.getServiceRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const request = await prisma.serviceRequest.findUnique({
      where: { id },
      include: { customer: true }
    });
    if (!request) return res.status(404).json({ error: 'Service request not found' });
    res.json({ request });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get service request' });
  }
};

exports.updateServiceRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, assignedTo, resolution, resolvedAt } = req.body;
    const serviceRequest = await prisma.serviceRequest.update({
      where: { id },
      data: { status, assignedTo, resolution, resolvedAt: resolvedAt ? new Date(resolvedAt) : undefined }
    });
    res.json({ message: 'Service request updated', serviceRequest });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update service request' });
  }
};

exports.getMyServiceRequests = async (req, res) => {
  try {
    const { id } = req.user;
    const requests = await prisma.serviceRequest.findMany({
      where: { customerId: id },
      orderBy: { createdAt: 'desc' }
    });
    res.json({ requests });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get service requests' });
  }
};