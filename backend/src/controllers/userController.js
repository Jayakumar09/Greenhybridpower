const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getProfile = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await prisma.customer.findUnique({
      where: { id },
      select: {
        id: true, name: true, email: true, phone: true, alternatePhone: true,
        aadharNumber: true, panNumber: true, profileImage: true, createdAt: true
      }
    });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get profile' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { id } = req.user;
    const { name, phone, alternatePhone, aadharNumber, panNumber } = req.body;
    const user = await prisma.customer.update({
      where: { id },
      data: { name, phone, alternatePhone, aadharNumber, panNumber }
    });
    res.json({ message: 'Profile updated', user: { id: user.id, name: user.name, email: user.email, phone: user.phone } });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update profile' });
  }
};

exports.getAddresses = async (req, res) => {
  try {
    const { id } = req.user;
    const addresses = await prisma.address.findMany({ where: { customerId: id } });
    res.json({ addresses });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get addresses' });
  }
};

exports.addAddress = async (req, res) => {
  try {
    const { id } = req.user;
    const { addressType, addressLine1, addressLine2, city, state, pincode, landmark, isDefault } = req.body;
    if (isDefault) {
      await prisma.address.updateMany({ where: { customerId: id }, data: { isDefault: false } });
    }
    const address = await prisma.address.create({
      data: { customerId: id, addressType, addressLine1, addressLine2, city, state, pincode, landmark, isDefault: isDefault || false }
    });
    res.status(201).json({ message: 'Address added', address });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add address' });
  }
};

exports.updateAddress = async (req, res) => {
  try {
    const { id } = req.user;
    const { addressId } = req.params;
    const data = req.body;
    if (data.isDefault) {
      await prisma.address.updateMany({ where: { customerId: id, NOT: { id: addressId } }, data: { isDefault: false } });
    }
    const address = await prisma.address.update({ where: { id: addressId }, data });
    res.json({ message: 'Address updated', address });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update address' });
  }
};

exports.deleteAddress = async (req, res) => {
  try {
    const { addressId } = req.params;
    await prisma.address.delete({ where: { id: addressId } });
    res.json({ message: 'Address deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete address' });
  }
};

exports.getNotifications = async (req, res) => {
  try {
    const { id } = req.user;
    const notifications = await prisma.notification.findMany({
      where: { customerId: id },
      orderBy: { createdAt: 'desc' },
      take: 50
    });
    res.json({ notifications });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get notifications' });
  }
};

exports.markNotificationRead = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.notification.update({ where: { id }, data: { isRead: true } });
    res.json({ message: 'Notification marked as read' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to mark notification' });
  }
};