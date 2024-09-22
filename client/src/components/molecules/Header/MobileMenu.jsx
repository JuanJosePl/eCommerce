import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const MobileMenu = ({ isOpen, onClose, isAuthenticated, isAdmin }) => {
  const menuItems = [
    { label: "Productos", link: "/productos" },
    { label: "Innovación", link: "/innovacion" },
    { label: "Sostenibilidad", link: "/sostenibilidad" },
    { label: "Comunidad", link: "/comunidad" },
  ];

  const adminItems = [
    { label: "Gestionar Productos", link: "/admin/productos" },
    { label: "Gestionar Pedidos", link: "/admin/pedidos" },
    { label: "Gestionar Usuarios", link: "/admin/usuarios" },
    { label: "Analíticas", link: "/admin/analiticas" },
  ];

  const accountItems = [
    { label: "Perfil", link: "/perfil" },
    { label: "Mis Pedidos", link: "/mis-pedidos" },
    { label: "Configuración", link: "/configuracion" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-background"
          initial={{ opacity: 0, x: "-100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "-100%" }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col h-full overflow-y-auto">
            <div className="flex justify-end p-4">
              <Button variant="ghost" onClick={onClose}>
                Cerrar
              </Button>
            </div>
            <nav className="flex-1 p-4">
              <ul className="space-y-4">
                {menuItems.map((item) => (
                  <li key={item.label}>
                    <Link to={item.link} onClick={onClose}>
                      <Button variant="ghost" className="w-full justify-start">
                        {item.label}
                      </Button>
                    </Link>
                  </li>
                ))}
              </ul>
              {isAuthenticated && (
                <Accordion type="single" collapsible className="mt-4">
                  <AccordionItem value="account">
                    <AccordionTrigger>Mi Cuenta</AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2">
                        {accountItems.map((item) => (
                          <li key={item.label}>
                            <Link to={item.link} onClick={onClose}>
                              <Button
                                variant="ghost"
                                className="w-full justify-start"
                              >
                                {item.label}
                              </Button>
                            </Link>
                          </li>
                        ))}
                        <li>
                          <Button
                            variant="ghost"
                            className="w-full justify-start"
                            onClick={() => {
                              /* Implementar lógica de cierre de sesión */
                            }}
                          >
                            Cerrar sesión
                          </Button>
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  {isAdmin && (
                    <AccordionItem value="admin">
                      <AccordionTrigger>Admin</AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2">
                          {adminItems.map((item) => (
                            <li key={item.label}>
                              <Link to={item.link} onClick={onClose}>
                                <Button
                                  variant="ghost"
                                  className="w-full justify-start"
                                >
                                  {item.label}
                                </Button>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  )}
                </Accordion>
              )}
              {!isAuthenticated && (
                <div className="mt-4 space-y-2">
                  <Link to="/login" onClick={onClose}>
                    <Button variant="default" className="w-full">
                      Iniciar sesión
                    </Button>
                  </Link>
                  <Link to="/register" onClick={onClose}>
                    <Button variant="outline" className="w-full">
                      Registrarse
                    </Button>
                  </Link>
                </div>
              )}
            </nav>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
