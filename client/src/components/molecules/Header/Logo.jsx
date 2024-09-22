import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getAuthStatus, isAdmin } from "@/helper/auth";

const Logo = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdminUser, setIsAdminUser] = useState(false);

  useEffect(() => {
    const checkAuthAndRole = async () => {
      const { isAuthenticated: authStatus } = await getAuthStatus();
      setIsAuthenticated(authStatus);
      if (authStatus) {
        const adminStatus = await isAdmin();
        setIsAdminUser(adminStatus);
      }
    };
    checkAuthAndRole();
  }, []);

  // Determinar la ruta dependiendo del rol
  const logoLink = isAuthenticated
    ? isAdminUser
      ? "/admin"
      : "/dashboard" 
    : "/"; 

  return (
    <motion.div 
      className="flex items-center"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Link to={logoLink} className="flex items-center">
        <svg
          className="h-10 w-10 text-primary"
          fill="none"
          height="24"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="m2 7 4.5-2.5 4 2.5 4.5-2.5 4 2.5" />
          <path d="M2 17c1.6-2 3.4-3 5.5-3 3.5 0 7 3 12.5 0" />
          <path d="M2 12c1.6-2 3.4-3 5.5-3 3.5 0 7 3 12.5 0" />
        </svg>
        <span className="sr-only">Logo OasisShop</span>
        <span className="ml-2 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          OasisShop
        </span>
      </Link>
    </motion.div>
  );
};

export default Logo;
