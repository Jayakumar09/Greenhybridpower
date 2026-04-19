const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createBooking = async (req, res) => {
  try {
    const { id } = req.user;
    const { leadId, scheduledDate, scheduledTime, address, city, state, pincode, propertyType, roofType, avgMonthlyBill } = req.body;
    const booking = await prisma.booking.create({
      data: {
        customerId: id, leadId, scheduledDate: new Date(scheduledDate), scheduledTime, address, city, state, pincode, propertyType, roofType, avgMonthlyBill
      }
    });
    res.status(201).json({ message: 'Booking created', booking });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create booking' });
  }
};

exports.getBookings = async (req, res) => {
  try {
    const { page = 1, limit = 20, status } = req.query;
    const where = status ? { status } : {};
    const bookings = await prisma.booking.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: parseInt(limit),
      include: { customer: { select: { id: true, name: true, email: true, phone: true } } }
    });
    const total = await prisma.booking.count({ where });
    res.json({ bookings, total, page: parseInt(page), totalPages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get bookings' });
  }
};

exports.getBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await prisma.booking.findUnique({
      where: { id },
      include: { customer: true, lead: true }
    });
    if (!booking) return res.status(404).json({ error: 'Booking not found' });
    res.json({ booking });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get booking' });
  }
};

exports.updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { scheduledDate, scheduledTime, status, assignedTo, technicianNote, rescheduledDate, cancelledReason } = req.body;
    const booking = await prisma.booking.update({
      where: { id },
      data: { scheduledDate: scheduledDate ? new Date(scheduledDate) : undefined, scheduledTime, status, assignedTo, technicianNote, rescheduledDate: rescheduledDate ? new Date(rescheduledDate) : undefined, cancelledReason }
    });
    res.json({ message: 'Booking updated', booking });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update booking' });
  }
};

exports.getMyBookings = async (req, res) => {
  try {
    const { id } = req.user;
    const bookings = await prisma.booking.findMany({
      where: { customerId: id },
      orderBy: { createdAt: 'desc' }
    });
    res.json({ bookings });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get bookings' });
  }
};