import rateLimit from 'express-rate-limit';
import requestIp from 'request-ip';

export const apiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hora
  max: 1000, // limita cada IP a 1000 solicitudes por ventana de 1 hora
  keyGenerator: (req) => {
    return requestIp.getClientIp(req); 
  },
  handler: (req, res) => {
    res.status(429).json({
      error: 'Demasiadas solicitudes, por favor intente de nuevo más tarde.'
    });
  },
  standardHeaders: true,
  legacyHeaders: false, 
});