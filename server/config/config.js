import dotenv from 'dotenv';

dotenv.config();

export const {
  PORT = 8000,
  MONGO_URL,
  SALT_ROUNDS,
  SECRET_JWT_KEY,
  SECRET_REFRESH_KEY,
  EMAIL_USER,
  EMAIL_PASS,
  FRONTEND_URL,
  OTP_SECRET,
} = process.env;

export const NODE_ENV = process.env.NODE_ENV || 'development';
