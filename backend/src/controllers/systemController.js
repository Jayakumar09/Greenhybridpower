exports.healthCheck = async (req, res) => {
  try {
    const prisma = req.app.locals.prisma;
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: 'ok', timestamp: new Date().toISOString(), database: 'connected' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Database connection failed' });
  }
};

exports.getStats = async (req, res) => {
  res.json({
    system: 'SISFS API',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
};