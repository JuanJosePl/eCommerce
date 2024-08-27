import React from "react";
import { Link } from "react-router-dom";

const MainMenu = () => {
  return (
    <nav className="w-full">
      <ul className="flex justify-end space-x-8 text-white">
        <li className="flex items-center">
          <Link className="menu-item" to="/">
            Inicio
          </Link>
        </li>
        <li className="flex items-center">
          <Link className="menu-item" to="/productos">
            Productos
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default MainMenu;
