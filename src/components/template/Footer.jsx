import React from "react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="w-full py-6 bg-gray-100 dark:bg-gray-800">
    <div className="container px-4 md:px-6">
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Sobre Nosotros</h3>
          <ul className="space-y-1">
            <li>
              <Link
                className="text-sm hover:underline"
                to="/sobre-nosotros/historia"
              >
                Nuestra Historia
              </Link>
            </li>
            <li>
              <Link
                className="text-sm hover:underline"
                to="/sobre-nosotros/equipo"
              >
                Equipo
              </Link>
            </li>
            <li>
              <Link
                className="text-sm hover:underline"
                to="/sobre-nosotros/carreras"
              >
                Carreras
              </Link>
            </li>
            <li>
              <Link className="text-sm hover:underline" to="/sostenibilidad">
                Sostenibilidad
              </Link>
            </li>
          </ul>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Productos</h3>
          <ul className="space-y-1">
            <li>
              <Link className="text-sm hover:underline" to="/categorias">
                Categorías
              </Link>
            </li>
            <li>
              <Link className="text-sm hover:underline" to="/nuevas-llegadas">
                Nuevas Llegadas
              </Link>
            </li>
            <li>
              <Link className="text-sm hover:underline" to="/mas-vendidos">
                Más Vendidos
              </Link>
            </li>
            <li>
              <Link
                className="text-sm hover:underline"
                to="/comparacion-productos"
              >
                Comparar Productos
              </Link>
            </li>
            <li>
              <Link className="text-sm hover:underline" to="/lista-deseos">
                Lista de Deseos
              </Link>
            </li>
          </ul>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Soporte</h3>
          <ul className="space-y-1">
            <li>
              <Link className="text-sm hover:underline" to="/faq">
                Preguntas Frecuentes
              </Link>
            </li>
            <li>
              <Link className="text-sm hover:underline" to="/contacto">
                Contacto
              </Link>
            </li>
            <li>
              <Link className="text-sm hover:underline" to="/devoluciones">
                Devoluciones
              </Link>
            </li>
            <li>
              <Link className="text-sm hover:underline" to="/guia-tallas">
                Guía de Tallas
              </Link>
            </li>
          </ul>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Cuenta</h3>
          <ul className="space-y-1">
            <li>
              <Link className="text-sm hover:underline" to="/login">
                Iniciar Sesión
              </Link>
            </li>
            <li>
              <Link className="text-sm hover:underline" to="/register">
                Registrarse
              </Link>
            </li>
            <li>
              <Link
                className="text-sm hover:underline"
                to="/programa-fidelidad"
              >
                Programa de Fidelidad
              </Link>
            </li>
          </ul>
          <h3 className="text-lg font-semibold mt-4">Síguenos</h3>
          <ul className="space-y-1">
            <li>
              <a
                className="text-sm hover:underline"
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook
              </a>
            </li>
            <li>
              <a
                className="text-sm hover:underline"
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                className="text-sm hover:underline"
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Twitter
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-6 border-t pt-4 text-center text-xs text-gray-500 dark:text-gray-400">
        © 2024 Ecommerce. Todos los derechos reservados.
        <Link className="ml-2 hover:underline" to="/terminos-y-condiciones">
          Términos y Condiciones
        </Link>
      </div>
    </div>
  </footer>
);

export default Footer;
