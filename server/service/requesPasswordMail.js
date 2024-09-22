import nodemailer from "nodemailer";
import { EMAIL_USER, EMAIL_PASS } from "../config/config.js";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

export const sendEmailPass = async (email, resetUrl) => {
  const mailOptions = {
    from: EMAIL_USER,
    to: email,
    subject: "Recuperación de Contraseña - OasisShop",
    html: `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Recuperación de Contraseña</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f7f9fc; color: #333333;">
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
        <tr>
          <td align="center" bgcolor="#ffffff" style="padding: 40px 0;">
            <img src="https://i.imgur.com/fT5VfjF.png" alt="OasisShop Logo" style="display: block; width: 35px; height: auto;">
          </td>
        </tr>
        <tr>
          <td style="padding: 40px 30px;">
            <h1 style="color: #2c3e50; font-size: 28px; font-weight: 600; margin-bottom: 20px; text-align: center;">Recuperación de Contraseña</h1>
            <p style="color: #34495e; font-size: 16px; line-height: 1.6; margin-bottom: 30px; text-align: center;">Para restablecer tu contraseña, utiliza el siguiente enlace:</p>
            <div style="background-color: #f1f8ff; border: 1px solid #e1ecf4; border-radius: 6px; padding: 20px; text-align: center; margin-bottom: 30px;">
              <a href="${resetUrl}" style="font-size: 16px; color: #3498db; text-decoration: none;">Restablecer Contraseña</a>
            </div>
            <p style="color: #7f8c8d; font-size: 14px; line-height: 1.6; margin-bottom: 0; text-align: center;">Este enlace expirará en 1 hora. Si no has solicitado este cambio, por favor ignora este correo.</p>
          </td>
        </tr>
        <tr>
          <td style="padding: 30px; text-align: center; background-color: #ecf0f1;">
            <p style="color: #95a5a6; font-size: 14px; margin: 0;">© 2024 OasisShop. Todos los derechos reservados.</p>
          </td>
        </tr>
      </table>
    </body>
    </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Correo de recuperación enviado exitosamente.");
  } catch (error) {
    console.error("Error enviando el correo de recuperación:", error);
    throw new Error("No se pudo enviar el correo de recuperación.");
  }
};
