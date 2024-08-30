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
              <Link className="text-sm hover:underline" to="/about">
                Nuestra Historia
              </Link>
            </li>
            <li>
              <Link className="text-sm hover:underline" to="/team">
                Equipo
              </Link>
            </li>
            <li>
              <Link className="text-sm hover:underline" to="/careers">
                Carreras
              </Link>
            </li>
          </ul>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Productos</h3>
          <ul className="space-y-1">
            <li>
              <Link className="text-sm hover:underline" to="/categories">
                Categorías
              </Link>
            </li>
            <li>
              <Link
                className="text-sm hover:underline"
                to="/
                /new-arrivals"
              >
                Nuevas Llegadas
              </Link>
            </li>
            <li>
              <Link className="text-sm hover:underline" to="/best-sellers">
                Más Vendidos
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
              <Link className="text-sm hover:underline" to="/contact">
                Contacto
              </Link>
            </li>
            <li>
              <Link className="text-sm hover:underline" to="/returns">
                Devoluciones
              </Link>
            </li>
          </ul>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Síguenos</h3>
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
      </div>
    </div>
  </footer>
);

export default Footer;
