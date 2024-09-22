import jwt from 'jsonwebtoken';
import { SECRET_JWT_KEY, SECRET_REFRESH_KEY } from '../config/config.js';
import Usuario from '../model/userModel.js';

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;

    if (!token) {
      return res.status(401).json({ mensaje: 'No autorizado, no hay token.' });
    }

    const decoded = jwt.verify(token, SECRET_JWT_KEY);

    const usuario = await Usuario.findById(decoded.id).select('-password');
    if (!usuario) {
      return res.status(401).json({ mensaje: 'No autorizado, usuario no encontrado.' });
    }

    req.user = usuario;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ mensaje: 'Token expirado', needsRefresh: true });
    }
    return res.status(401).json({ mensaje: 'No autorizado, token inválido.' });
  }
};


export const adminRoute = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ mensaje: 'No autorizado, se requiere rol de administrador.' });
  }
};

export const refreshAccessToken = async (req, res, next) => {
  const refreshToken = req.cookies.refresh_token;

  if (!refreshToken) {
    return res.status(401).json({ mensaje: 'No se proporcionó token de actualización.' });
  }

  try {
    const decoded = jwt.verify(refreshToken, SECRET_REFRESH_KEY);
    const usuario = await Usuario.findById(decoded.id);

    if (!usuario) {
      return res.status(401).json({ mensaje: 'Usuario no encontrado.' });
    }

    const accessToken = jwt.sign(
      { id: usuario._id, email: usuario.email, role: usuario.role },
      SECRET_JWT_KEY,
      { expiresIn: '1h' }
    );

    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 1000 // 1 hora
    });

    req.user = usuario;
    next();
  } catch (error) {
    return res.status(401).json({ mensaje: 'Token de actualización inválido.' });
  }
};