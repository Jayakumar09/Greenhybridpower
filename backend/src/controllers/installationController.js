const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createInstallation = async (req, res) => {
  try {
    const { customerId, quotationId, systemSize, estimatedDays } = req.body;
    const installation = await prisma.installation.create({
      data: { customerId, quotationId, systemSize, estimatedDays, startDate: new Date() }
    });
    await prisma.installationStage.createMany({
      data: [
        { installationId: installation.id, stage: 'site_preparation' },
        { installationId: installation.id, stage: 'mounting_structure' },
        { installationId: installation.id, stage: 'panel_installation' },
        { installationId: installation.id, stage: 'inverter_installation' },
        { installationId: installation.id, stage: 'wiring' },
        { installationId: installation.id, stage: 'testing' },
        { installationId: installation.id, stage: 'commissioning' }
      ]
    });
    res.status(201).json({ message: 'Installation created', installation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create installation' });
  }
};

exports.getInstallations = async (req, res) => {
  try {
    const { page = 1, limit = 20, status } = req.query;
    const where = status ? { status } : {};
    const installations = await prisma.installation.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: parseInt(limit),
      include: { customer: { select: { id: true, name: true, email: true, phone: true } } }
    });
    const total = await prisma.installation.count({ where });
    res.json({ installations, total, page: parseInt(page), totalPages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get installations' });
  }
};

exports.getInstallation = async (req, res) => {
  try {
    const { id } = req.params;
    const installation = await prisma.installation.findUnique({
      where: { id },
      include: { customer: true, stageHistory: { orderBy: { createdAt: 'asc' } }, documents: true }
    });
    if (!installation) return res.status(404).json({ error: 'Installation not found' });
    res.json({ installation });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get installation' });
  }
};

exports.updateInstallation = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, stage, actualDays } = req.body;
    const data = { status, actualDays };
    if (stage) {
      data.stage = stage;
      await prisma.installationStage.updateMany({ where: { installationId: id, stage }, data: { status: 'completed', completedAt: new Date() } });
    }
    const installation = await prisma.installation.update({ where: { id }, data });
    res.json({ message: 'Installation updated', installation });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update installation' });
  }
};

exports.updateStage = async (req, res) => {
  try {
    const { id } = req.params;
    const { stageId, status, notes, imageUrl } = req.body;
    const stage = await prisma.installationStage.update({
      where: { id: stageId },
      data: { status, notes, imageUrl, startedAt: status === 'in_progress' ? new Date() : undefined, completedAt: status === 'completed' ? new Date() : undefined }
    });
    res.json({ message: 'Stage updated', stage });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update stage' });
  }
};

exports.getMyInstallations = async (req, res) => {
  try {
    const { id } = req.user;
    const installations = await prisma.installation.findMany({
      where: { customerId: id },
      orderBy: { createdAt: 'desc' },
      include: { stageHistory: { orderBy: { createdAt: 'asc' } } }
    });
    res.json({ installations });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get installations' });
  }
};