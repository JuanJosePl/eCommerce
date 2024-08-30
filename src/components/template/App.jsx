import React from "react";
import MainHeader from "../organisms/MainHeader";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
Footer;
const App = () => {
  return (
    <>
      <div>
        <MainHeader />
        <div className="pt-20 max-w-200 m-auto">
          <Outlet />
        </div>
      </div>
      <div className="pt-20 max-w-200 m-auto">
        <Footer />
      </div>
    </>
  );
};

export default App;
