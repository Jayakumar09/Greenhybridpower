const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createPayment = async (req, res) => {
  try {
    const { id } = req.user;
    const { quotationId, amount, paymentType, paymentMode, transactionId, paymentProof } = req.body;
    const payment = await prisma.payment.create({
      data: { customerId: id, quotationId, amount, paymentType, paymentMode, transactionId, paymentProof }
    });
    res.status(201).json({ message: 'Payment recorded', payment });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create payment' });
  }
};

exports.getPayments = async (req, res) => {
  try {
    const { page = 1, limit = 20, status, paymentType } = req.query;
    const where = {};
    if (status) where.status = status;
    if (paymentType) where.paymentType = paymentType;
    const payments = await prisma.payment.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: parseInt(limit),
      include: { customer: { select: { id: true, name: true, email: true } } }
    });
    const total = await prisma.payment.count({ where });
    res.json({ payments, total, page: parseInt(page), totalPages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get payments' });
  }
};

exports.getPayment = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await prisma.payment.findUnique({
      where: { id },
      include: { customer: true, quotation: true }
    });
    if (!payment) return res.status(404).json({ error: 'Payment not found' });
    res.json({ payment });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get payment' });
  }
};

exports.updatePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, transactionId, razorpayOrderId, razorpayPaymentId, paidAt, remarks } = req.body;
    const payment = await prisma.payment.update({
      where: { id },
      data: { status, transactionId, razorpayOrderId, razorpayPaymentId, paidAt: paidAt ? new Date(paidAt) : undefined, remarks }
    });
    res.json({ message: 'Payment updated', payment });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update payment' });
  }
};

exports.getMyPayments = async (req, res) => {
  try {
    const { id } = req.user;
    const payments = await prisma.payment.findMany({
      where: { customerId: id },
      orderBy: { createdAt: 'desc' }
    });
    res.json({ payments });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get payments' });
  }
};