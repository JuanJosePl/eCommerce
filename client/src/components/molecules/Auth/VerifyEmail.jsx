import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../../constants/env";
import { useNavigate, useLocation } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/assets/icon";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const emailParam = params.get("email");
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    try {
      const response = await axios.post(`${API_URL}/api/auth/verify-email`, {
        email,
        otp,
      });
      if (
        response.data &&
        response.data.mensaje === "Email verificado exitosamente"
      ) {
        setMessage(
          "Email verificado exitosamente. Redirigiendo al inicio de sesión..."
        );
        setTimeout(() => navigate("/login"), 3000);
      } else {
        setError(
          "No se pudo verificar el email. Por favor, inténtalo de nuevo."
        );
      }
    } catch (err) {
      console.error("Error en la solicitud:", err);
      if (err.response && err.response.data.mensaje) {
        setError(err.response.data.mensaje);
      } else {
        setError(
          "Hubo un problema con el servidor. Por favor, inténtalo más tarde."
        );
      }
    }
  };

  const handleResendOTP = async () => {
    try {
      await axios.post(`${API_URL}/api/auth/resend-otp`, { email });
      setMessage("Se ha enviado un nuevo código OTP a tu correo electrónico.");
    } catch (err) {
      setError(
        "No se pudo reenviar el código OTP. Por favor, inténtalo más tarde."
      );
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
        <Logo />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          Verifica tu email
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Ingresa el código OTP enviado a tu correo electrónico
        </p>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <Label htmlFor="otp" className="sr-only">
                Código OTP
              </Label>
              <Input
                id="otp"
                name="otp"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                placeholder="Código OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
          </div>

          {error && <div className="text-red-600">{error}</div>}
          {message && <div className="text-green-600">{message}</div>}

          <div>
            <Button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <CheckCircle
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  aria-hidden="true"
                />
              </span>
              Verificar
            </Button>
          </div>
        </form>
        <div className="mt-4 text-center">
          <button
            onClick={handleResendOTP}
            className="text-sm text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
          >
            Reenviar código OTP
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
