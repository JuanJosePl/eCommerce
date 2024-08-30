import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../../constants/env";

import { Link, useNavigate } from "react-router-dom";
import RegisterTemplate from "../template/RegisterTemplate";

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
      details: {
        fullName: e.target.fullName.value,
      }
    };

    axios
      .post(`${API_URL}/public/users`, data)
      .then((resp) => {
        navigate("/")
      })
      .catch((err) => {
        console.error("Error en la solicitud:", err);
        setError(
          "Hubo un problema con el servidor. Por favor, inténtalo más tarde."
        );
      });
  };

  return (
    <RegisterTemplate>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-gray-700"
          >
            Nombre Completo
          </label>
          <input
            type="text"
            name="fullName"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Contraseña
          </label>
          <input
            type="password"
            name="password"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Crear Cuenta
          </button>
        </div>
        <div className="text-sm text-right">
          <Link
            to="/login"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Ya tengo una cuenta
          </Link>
        </div>
      </form>
    </RegisterTemplate>
  );
};

export default Register;
