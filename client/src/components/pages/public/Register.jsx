import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../../../constants/env";
import { Link, useNavigate } from "react-router-dom";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/assets/icon";

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!acceptedTerms) {
      setError("Debes aceptar los términos y condiciones.");
      return;
    }

    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
      nombre: e.target.fullName.value,
    };

    try {
      const response = await axios.post(`${API_URL}/api/auth/register`, data);
      if (response.data && response.data.mensaje === "Verifica tu correo electrónico") {
        console.log("Redirigiendo a: /verificar-email?email=" + encodeURIComponent(data.email));
        navigate(`/verificar-email?email=${encodeURIComponent(data.email)}`);
      } else {
        setError("No se pudo completar el registro. Por favor, inténtalo de nuevo.");
      }
    } catch (err) {
      console.log("Redirigiendo a: /verificar-email?email=" + encodeURIComponent(data.email));
      console.error("Error en la solicitud:", err);
      if (err.response && err.response.data.mensaje) {
        setError(err.response.data.mensaje);
      } else {
        setError("Hubo un problema con el servidor. Por favor, inténtalo más tarde.");
      }
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
        <Logo />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          Crea tu cuenta
        </h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <Label htmlFor="full-name" className="sr-only">
                Nombre completo
              </Label>
              <Input
                id="full-name"
                name="fullName"
                type="text"
                autoComplete="name"
                required
                className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 sm:text-sm"
                placeholder="Nombre completo"
              />
            </div>
            <div>
              <Label htmlFor="email-address" className="sr-only">
                Correo electrónico
              </Label>
              <Input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 sm:text-sm"
                placeholder="Correo electrónico"
              />
            </div>
            <div>
              <Label htmlFor="password" className="sr-only">
                Contraseña
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 sm:text-sm"
                placeholder="Contraseña"
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              onChange={(e) => setAcceptedTerms(e.target.checked)}
            />
            <Label
              htmlFor="terms"
              className="ml-2 block text-sm text-gray-900 dark:text-gray-400"
            >
              Acepto los{" "}
              <Link
                to="/terminos-y-condiciones"
                className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
              >
                términos y condiciones
              </Link>{" "}
              y la{" "}
              <Link
                to="/politica-de-privacidad"
                className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
              >
                política de privacidad
              </Link>
              .
            </Label>
          </div>

          {error && <div className="text-red-600">{error}</div>}

          <div>
            <Button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <User
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  aria-hidden="true"
                />
              </span>
              Registrarse
            </Button>
          </div>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            ¿Ya tienes una cuenta?{" "}
            <Link
              to="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
            >
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;