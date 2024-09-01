import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from '@/components/ui/button'; 
import { clearLocal, getToken } from "../../../helper/auth";

const MainMenu = () => {
  const navigate = useNavigate();

  const handleSession = () => {
    clearLocal();
    navigate("/");
  };

  return (
    <nav className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-4">
      <Link className="text-sm font-medium hover:underline" to="/productos">
        Productos
      </Link>
      {!getToken() ? (
        <>
          <Link to="/login">
            <Button variant="ghost" className="w-full text-left md:w-auto">Iniciar sesión</Button>
          </Link>
          <Link to="/register">
            <Button variant="ghost" className="w-full text-left md:w-auto">Registrarse</Button>
          </Link>
        </>
      ) : (
        <Button variant="ghost" onClick={handleSession} className="w-full text-left md:w-auto">
          Cerrar sesión
        </Button>
      )}
    </nav>
  );
};

export default MainMenu;
