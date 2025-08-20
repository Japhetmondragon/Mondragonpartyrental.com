// Zod-powered validator that supports body, params, and query
export const validate =
  (schema, where = "body") =>
  (req, res, next) => {
    const parsed = schema.safeParse(req[where]);
    if (!parsed.success) {
      const flat = parsed.error.flatten();
      return res.status(400).json({ errors: flat });
    }
    // Mutate in place; do not reassign req.body/req.query in Express 5
    Object.assign(req[where], parsed.data);
    next();
  };
