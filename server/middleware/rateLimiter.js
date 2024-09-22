import rateLimit from 'express-rate-limit';

export const apiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hora
  max: 1000, // limita cada IP a 1000 solicitudes por ventana de 1 hora
});
