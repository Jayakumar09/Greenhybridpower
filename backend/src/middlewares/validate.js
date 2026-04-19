const z = require('zod');

exports.validate = (schema) => {
  return (req, res, next) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message
        }));
        return res.status(400).json({ error: 'Validation failed', errors });
      }
      next(error);
    }
  };
};

exports.schemas = {
  register: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    phone: z.string().optional()
  }),

  login: z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(1, 'Password is required')
  }),

  createLead: z.object({
    name: z.string().min(2, 'Name is required'),
    email: z.string().email('Invalid email'),
    phone: z.string().min(10, 'Phone is required'),
    address: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    systemSize: z.string().optional(),
    budget: z.string().optional()
  }),

  createBooking: z.object({
    scheduledDate: z.string(),
    scheduledTime: z.string(),
    address: z.string(),
    city: z.string(),
    state: z.string(),
    pincode: z.string(),
    propertyType: z.string()
  }),

  createQuotation: z.object({
    leadId: z.string().optional(),
    planId: z.string().optional(),
    systemSize: z.number(),

    panelDetails: z.string(),
    inverterDetails: z.string(),
    batteryDetails: z.string().optional(),
    totalPrice: z.number()
  }),

  createPayment: z.object({
    quotationId: z.string().optional(),
    amount: z.number(),
    paymentType: z.string()
  }),

  createServiceRequest: z.object({
    type: z.string(),
    issue: z.string(),
    description: z.string()
  })
};