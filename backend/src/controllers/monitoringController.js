const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.addMonitoringData = async (req, res) => {
  try {
    const { customerId, installationId, date, generatedUnits, consumedUnits, exportedUnits, savings } = req.body;
    const monitoring = await prisma.energyMonitoring.create({
      data: { customerId, installationId, date: new Date(date), generatedUnits, consumedUnits, exportedUnits, savings }
    });
    res.status(201).json({ message: 'Monitoring data added', monitoring });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add monitoring data' });
  }
};

exports.getMonitoringData = async (req, res) => {
  try {
    const { customerId, installationId, startDate, endDate } = req.query;
    const where = {};
    if (customerId) where.customerId = customerId;
    if (installationId) where.installationId = installationId;
    if (startDate && endDate) {
      where.date = { gte: new Date(startDate), lte: new Date(endDate) };
    }
    const data = await prisma.energyMonitoring.findMany({
      where,
      orderBy: { date: 'desc' },
      take: 365
    });
    res.json({ data });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get monitoring data' });
  }
};

exports.getMyMonitoringData = async (req, res) => {
  try {
    const { id } = req.user;
    const { startDate, endDate, period = 'month' } = req.query;
    const where = { customerId: id };
    if (startDate && endDate) {
      where.date = { gte: new Date(startDate), lte: new Date(endDate) };
    }
    const data = await prisma.energyMonitoring.findMany({
      where,
      orderBy: { date: 'desc' },
      take: period === 'year' ? 365 : period === 'month' ? 30 : 7
    });
    const totalGenerated = data.reduce((acc, d) => acc + Number(d.generatedUnits), 0);
    const totalConsumed = data.reduce((acc, d) => acc + Number(d.consumedUnits), 0);
    const totalExported = data.reduce((acc, d) => acc + Number(d.exportedUnits), 0);
    const totalSavings = data.reduce((acc, d) => acc + Number(d.savings), 0);
    res.json({ data, summary: { totalGenerated, totalConsumed, totalExported, totalSavings } });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get monitoring data' });
  }
};