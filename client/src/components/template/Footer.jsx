import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  const footerSections = [
    {
      title: "Sobre Nosotros",
      links: [
        { label: "Nuestra Historia", url: "/sobre-nosotros/historia" },
        { label: "Equipo", url: "/sobre-nosotros/equipo" },
        { label: "Carreras", url: "/sobre-nosotros/carreras" },
        { label: "Sostenibilidad", url: "/sostenibilidad" },
      ],
    },
    {
      title: "Productos",
      links: [
        { label: "Categorías", url: "/categorias" },
        { label: "Nuevas Llegadas", url: "/nuevas-llegadas" },
        { label: "Más Vendidos", url: "/mas-vendidos" },
        { label: "Comparar Productos", url: "/comparacion-productos" },
        { label: "Lista de Deseos", url: "/lista-deseos" },
      ],
    },
    {
      title: "Soporte",
      links: [
        { label: "Preguntas Frecuentes", url: "/faq" },
        { label: "Contacto", url: "/contacto" },
        { label: "Devoluciones", url: "/devoluciones" },
        { label: "Guía de Tallas", url: "/guia-tallas" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Términos y Condiciones", url: "/terminos-y-condiciones" },
        { label: "Política de Privacidad", url: "/politica-de-privacidad" },
        { label: "Cookies", url: "/politica-de-cookies" },
      ],
    },
  ];

  const socialLinks = [
    { icon: Facebook, url: "https://www.facebook.com" },
    { icon: Instagram, url: "https://www.instagram.com" },
    { icon: Twitter, url: "https://www.twitter.com" },
  ];

  return (
    <motion.footer
      className="bg-card text-card-foreground"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {footerSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className="text-lg font-semibold mb-4 text-primary">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.url}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
        <motion.div
          className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="mb-4 md:mb-0">
            <Link to="/" className="text-2xl font-bold text-primary">
              OasisShop
            </Link>
            <p className="mt-2 text-sm text-muted-foreground">
              © 2024 OasisShop. Todos los derechos reservados.
            </p>
          </div>
          <div className="flex space-x-4">
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <link.icon className="h-6 w-6" />
                <span className="sr-only">{link.url.split('.com')[0].split('www.')[1]}</span>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;