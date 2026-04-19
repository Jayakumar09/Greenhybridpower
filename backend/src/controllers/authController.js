const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const generateToken = (id, email, role) => {
  return jwt.sign(
    { id, email, role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
};

exports.register = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email and password are required' });
    }

    const existingCustomer = await prisma.customer.findUnique({ where: { email } });
    if (existingCustomer) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const customer = await prisma.customer.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone
      }
    });

    const token = generateToken(customer.id, customer.email, 'customer');

    res.status(201).json({
      message: 'Registration successful',
      token,
      user: {
        id: customer.id,
        name: customer.name,
        email: customer.email,
        role: 'customer'
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const customer = await prisma.customer.findUnique({ where: { email } });
    if (!customer) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isValidPassword = await bcrypt.compare(password, customer.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = generateToken(customer.id, customer.email, 'customer');

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: customer.id,
        name: customer.name,
        email: customer.email,
        role: 'customer'
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
};

exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const admin = await prisma.admin.findUnique({ where: { email } });
    if (!admin) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isValidPassword = await bcrypt.compare(password, admin.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = generateToken(admin.id, admin.email, admin.role);

    res.json({
      message: 'Admin login successful',
      token,
      user: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ error: 'Admin login failed' });
  }
};

exports.getMe = async (req, res) => {
  try {
    const { id, email, role } = req.user;

    let user;
    if (role === 'admin') {
      user = await prisma.admin.findUnique({ where: { id } });
    } else {
      user = await prisma.customer.findUnique({ where: { id } });
      user.addresses = await prisma.address.findMany({ where: { customerId: id } });
    }

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role,
        phone: user.phone,
        ...(role === 'customer' && { addresses: user.addresses })
      }
    });
  } catch (error) {
    console.error('Get me error:', error);
    res.status(500).json({ error: 'Failed to get user info' });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { id, role } = req.user;

    if (!password) {
      return res.status(400).json({ error: 'New password is required' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    if (role === 'admin') {
      await prisma.admin.update({ where: { id }, data: { password: hashedPassword } });
    } else {
      await prisma.customer.update({ where: { id }, data: { password: hashedPassword } });
    }

    res.json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ error: 'Password reset failed' });
  }
};