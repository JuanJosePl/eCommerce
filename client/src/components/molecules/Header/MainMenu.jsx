import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/helper/auth";
import { useCart } from "@/context/CartContext";
import {
  ChevronDown,
  User,
  ShoppingBag,
  Settings,
  LogOut,
  BarChart2,
  Package,
  Users,
  FileText,
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

const MainMenu = ({ isAdmin }) => {
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

  const handleSession = async () => {
    setIsLogoutDialogOpen(false);
    await logout();
    clearCart();
    navigate("/");
  };

  const menuItems = [
    { label: "Productos", link: "/productos" },
    { label: "Innovación", link: "/innovacion" },
  ];

  const dropdownVariants = {
    hidden: { opacity: 0, y: -5, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
    exit: { opacity: 0, y: -5, scale: 0.95 },
  };

  const CustomDropdownContent = ({ children }) => (
    <AnimatePresence>
      {openDropdown && (
        <DropdownMenuContent
          className="border-2 border-primary shadow-lg rounded-lg p-2 w-56"
          asChild
          forceMount
        >
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={dropdownVariants}
            className="bg-white dark:bg-gray-800" // Cambiado a bg-white para modo claro
          >
            {children}
          </motion.div>
        </DropdownMenuContent>
      )}
    </AnimatePresence>
  );

  const MenuItem = ({ icon: Icon, label, onClick }) => (
    <DropdownMenuItem
      className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors duration-200"
      onClick={onClick}
    >
      <Icon className="mr-2 h-4 w-4" />
      <span>{label}</span>
    </DropdownMenuItem>
  );

  return (
    <nav className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
      {menuItems.map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Link to={item.link}>
            <Button
              variant="ghost"
              className="w-full md:w-auto text-foreground hover:text-primary transition-colors"
            >
              {item.label}
            </Button>
          </Link>
        </motion.div>
      ))}

      {isAdmin && (
        <DropdownMenu
          onOpenChange={(open) => setOpenDropdown(open ? "admin" : null)}
        >
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center">
              Admin <ChevronDown className="ml-1 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <CustomDropdownContent>
            <DropdownMenuLabel className="font-bold text-lg pb-2">
              Panel de Administración
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-primary/20" />
            <MenuItem
              icon={Package}
              label="Gestionar Productos"
              onClick={() => navigate("/admin/productos")}
            />
            <MenuItem
              icon={FileText}
              label="Gestionar Pedidos"
              onClick={() => navigate("/admin/pedidos")}
            />
            <MenuItem
              icon={Users}
              label="Gestionar Usuarios"
              onClick={() => navigate("/admin/usuarios")}
            />
            <MenuItem
              icon={BarChart2}
              label="Analíticas"
              onClick={() => navigate("/admin/analiticas")}
            />
          </CustomDropdownContent>
        </DropdownMenu>
      )}

      <DropdownMenu
        onOpenChange={(open) => setOpenDropdown(open ? "cuenta" : null)}
      >
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center">
            Mi Cuenta <ChevronDown className="ml-1 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <CustomDropdownContent>
          <DropdownMenuLabel className="font-bold text-lg pb-2">
            Mi Cuenta
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-primary/20" />
          <MenuItem
            icon={User}
            label="Perfil"
            onClick={() => navigate("/perfil")}
          />
          <MenuItem
            icon={ShoppingBag}
            label="Mis Pedidos"
            onClick={() => navigate("/mis-pedidos")}
          />
          <MenuItem
            icon={Settings}
            label="Configuración"
            onClick={() => navigate("/configuracion")}
          />
          <DropdownMenuSeparator className="bg-primary/20" />
          <MenuItem
            icon={LogOut}
            label="Cerrar sesión"
            onClick={() => setIsLogoutDialogOpen(true)}
          />
        </CustomDropdownContent>
      </DropdownMenu>

      <Dialog open={isLogoutDialogOpen} onOpenChange={setIsLogoutDialogOpen}>
        <DialogContent className="bg-white dark:bg-gray-800"> {/* Cambiado a bg-white para modo claro */}
          <DialogHeader>
            <DialogTitle>Cerrar sesión</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que quieres cerrar sesión?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsLogoutDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSession}>Cerrar sesión</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </nav>
  );
};

export default MainMenu;