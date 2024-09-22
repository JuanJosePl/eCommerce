import Joi from 'joi';

export const validateUser = (req, res, next) => {
  const schema = Joi.object({
    nombre: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('user', 'admin')
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ mensaje: error.details[0].message });
  }
  next();
};

// Funciones de validación similares para otras rutas
