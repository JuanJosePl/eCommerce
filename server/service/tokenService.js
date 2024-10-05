import jwt from "jsonwebtoken";

const SECRET_JWT_KEY = process.env.SECRET_JWT_KEY;
const SECRET_REFRESH_KEY = process.env.SECRET_REFRESH_KEY;

export const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    SECRET_JWT_KEY,
    { expiresIn: "1h" }
  );
};

export const generateRefreshToken = (user) => {
  return jwt.sign({ id: user._id }, SECRET_REFRESH_KEY, {
    expiresIn: "7d",
  });
};

export const verifyToken = (token, secretKey) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    return null;
  }
};

export const setCookie = (res, name, value, options = {}) => {
  res.cookie(name, value, {
    httpOnly: true,
    secure: NODE_ENV === 'production',
    sameSite: 'none',
    path: '/',
    ...options,
  });
};
