import React from "react";
import { Link } from "react-router-dom";
import LogoEcommerce from "../../../assets/e-commerce.png";

const Logo = () => {
  return (
    <div className="flex items-center">
      <Link to="/">
        <img
          src={LogoEcommerce}
          alt="Logo Ecommerce"
          className="w-20 h-20 object-contain"
        />
      </Link>
    </div>
  );
};

export default Logo;
