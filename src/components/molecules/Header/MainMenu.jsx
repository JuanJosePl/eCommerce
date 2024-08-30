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
    <nav className="hidden md:flex items-center space-x-4">
      <Link className="text-sm font-medium hover:underline" to="/">
        Productos
      </Link>
      {!getToken() ? (
        <>
          <Link to="/login">
            <Button variant="ghost">Iniciar sesión</Button>
          </Link>
          <Link to="/register">
            <Button variant="ghost">Registrarse</Button>
          </Link>
        </>
      ) : (
        <Button variant="ghost" onClick={handleSession}>
          Cerrar sesión
        </Button>
      )}
    </nav>
  );
};

export default MainMenu;
