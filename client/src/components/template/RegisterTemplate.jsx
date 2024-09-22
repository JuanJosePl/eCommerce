import React from 'react';
import { Link } from 'react-router-dom';

const RegisterTemplate = ({ children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Formulario de Registro */}
        <div className="w-1/2 p-8">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6">
            Crear Cuenta
          </h2>
          {children}
        </div>

        {/* Tarjeta de Descripción */}
        <div className="w-1/2 bg-blue-600 text-white p-8 flex items-center justify-center">
          <div>
            <h2 className="text-4xl font-extrabold mb-4">
              Únete a nosotros
            </h2>
            <p className="text-lg mb-6">
              Regístrate para disfrutar de una experiencia personalizada y mantenerte al tanto de nuestras últimas ofertas y productos.
            </p>
            <Link
              to="/login"
              className="inline-block px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-100"
            >
              Iniciar sesión
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterTemplate;
