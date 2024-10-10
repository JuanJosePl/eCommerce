import Usuario from "../model/userModel.js";
import { SECRET_JWT_KEY, SECRET_REFRESH_KEY, NODE_ENV } from "../config/config.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
  setCookie,
} from "../service/tokenService.js";
import crypto from "crypto";
import { sendOTPEmail } from "../service/mailService.js";
import { sendEmailPass } from "../service/requesPasswordMail.js";

// Función para generar OTP
const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
};

export const resendOTP = async (req, res) => {
  const { email } = req.body;
  try {
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado." });
    }

    const otp = generateOTP();
    usuario.otp = otp;
    usuario.otpExpires = Date.now() + 600000; // 10 minutos
    await usuario.save();

    await sendOTPEmail(email, otp);

    res.json({ mensaje: "Nuevo OTP enviado exitosamente." });
  } catch (error) {
    res.status(500).json({ mensajeError: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const usuario = await Usuario.findOne({
      email,
      otp,
      otpExpires: { $gt: Date.now() },
    });

    if (!usuario) {
      return res.status(401).json({ mensaje: "OTP inválido o expirado." });
    }

    usuario.emailVerificado = true;
    usuario.otp = undefined;
    usuario.otpExpires = undefined;
    await usuario.save();

    res.json({ mensaje: "Email verificado exitosamente" });
  } catch (error) {
    res.status(500).json({ mensajeError: error.message });
  }
};

export const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const usuario = await Usuario.findOne({
      email,
      otp,
      otpExpires: { $gt: Date.now() },
    });

    if (!usuario) {
      return res.status(401).json({ mensaje: "OTP inválido o expirado." });
    }

    usuario.otp = undefined;
    usuario.otpExpires = undefined;
    await usuario.save();

    const accessToken = generateAccessToken(usuario);
    const refreshToken = generateRefreshToken(usuario);

    setCookie(res, "access_token", accessToken, { maxAge: 60 * 60 * 1000 });
    setCookie(res, "refresh_token", refreshToken, { maxAge: 7 * 24 * 60 * 60 * 1000 });

    res.json({
      mensaje: "Inicio de sesión exitoso",
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        role: usuario.role,
      },
    });
  } catch (error) {
    res.status(500).json({ mensajeError: error.message });
  }
};

export const register = async (req, res) => {
  const { nombre, email, password } = req.body;
  try {
    let usuario = await Usuario.findOne({ email });
    if (usuario) {
      return res.status(400).json({ mensaje: "El usuario ya existe." });
    }

    usuario = new Usuario({ nombre, email, password });

    const otp = generateOTP();
    usuario.otp = otp;
    usuario.otpExpires = Date.now() + 600000; // 10 minutos
    await usuario.save();

    await sendOTPEmail(email, otp);

    res.status(201).json({ mensaje: "Verifica tu correo electrónico" });
  } catch (error) {
    console.error("Error en el servidor:", error);
    res.status(500).json({ mensajeError: "Hubo un problema en el servidor." });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(401).json({ mensaje: "Usuario no encontrado." });
    }

    if (!usuario.emailVerificado) {
      return res.status(401).json({
        mensaje: "Por favor, verifica tu email antes de iniciar sesión.",
      });
    }

    const isMatch = await usuario.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ mensaje: "Contraseña incorrecta." });
    }

    const accessToken = generateAccessToken(usuario);
    const refreshToken = generateRefreshToken(usuario);

    setCookie(res, "access_token", accessToken, { maxAge: 60 * 60 * 1000 });
    setCookie(res, "refresh_token", refreshToken, { maxAge: 7 * 24 * 60 * 60 * 1000 });

    res.json({
      mensaje: "Inicio de sesión exitoso",
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        role: usuario.role,
      },
    });
  } catch (error) {
    res.status(500).json({ mensajeError: error.message });
  }
};

export const refreshToken = async (req, res) => {
  const refreshToken = req.cookies.refresh_token;

  if (!refreshToken) {
    return res.status(401).json({ mensaje: "No se proporcionó token de actualización." });
  }

  try {
    const decoded = verifyToken(refreshToken, SECRET_REFRESH_KEY);
    if (!decoded) {
      return res.status(403).json({ mensaje: "Token de actualización inválido." });
    }

    const usuario = await Usuario.findById(decoded.id);
    if (!usuario) {
      return res.status(401).json({ mensaje: "Usuario no encontrado." });
    }

    const accessToken = generateAccessToken(usuario);

    setCookie(res, "access_token", accessToken, { maxAge: 60 * 60 * 1000 });

    res.json({ mensaje: "Token de acceso actualizado exitosamente." });
  } catch (error) {
    return res.status(403).json({ mensaje: "Token de actualización inválido." });
  }
};

export const logout = (req, res) => {
  res.clearCookie("access_token", {
    path: "/",
    sameSite: "none",
    secure: NODE_ENV === "production",
  });
  res.clearCookie("refresh_token", {
    path: "/",
    sameSite: "none",
    secure: NODE_ENV === "production",
  });
  res.json({ mensaje: "Cierre de sesión exitoso." });
};

export const checkAuthStatus = (req, res) => {
  res.json({
    isAuthenticated: true,
    usuario: {
      id: req.user._id,
      nombre: req.user.nombre,
      email: req.user.email,
      role: req.user.role,
    },
  });
};

export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const usuario = await Usuario.findById(req.user._id);

    const isMatch = await usuario.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({ mensaje: "Contraseña actual incorrecta." });
    }

    usuario.password = newPassword;
    await usuario.save();

    res.json({ mensaje: "Contraseña actualizada exitosamente." });
  } catch (error) {
    res.status(500).json({ mensajeError: error.message });
  }
};

export const requestResetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(404).json({ mensaje: "No existe un usuario con ese correo electrónico." });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    usuario.resetPasswordToken = resetToken;
    usuario.resetPasswordExpires = Date.now() + 3600000; // 1 hora
    await usuario.save();

    const resetUrl = `https://desarrollo-e-commerce-blond-nu.vercel.app/reset-password/${resetToken}`;
    await sendEmailPass(email, resetUrl);

    res.json({
      mensaje: "Se ha enviado un correo electrónico para restablecer la contraseña.",
    });
  } catch (error) {
    res.status(500).json({ mensajeError: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const usuario = await Usuario.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!usuario) {
      return res.status(400).json({ mensaje: "Token inválido o expirado." });
    }

    usuario.password = newPassword;
    usuario.resetPasswordToken = undefined;
    usuario.resetPasswordExpires = undefined;
    await usuario.save();

    res.json({ mensaje: "Contraseña restablecida exitosamente." });
  } catch (error) {
    res.status(500).json({ mensajeError: error.message });
  }
};