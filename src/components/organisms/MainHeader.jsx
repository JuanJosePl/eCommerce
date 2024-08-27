import React from "react";
import Logo from "../molecules/Header/Logo";
import MainMenu from "../molecules/Header/MainMenu";

const MainHeader = () => {
    return (
        <header className="fixed bg-gradient w-full z-10 shadow-lg">
            <div className="w-full lg:max-w-200 m-auto flex justify-between items-center px-8">
                <Logo />
                <MainMenu />
            </div>
        </header>
    );
};

export default MainHeader;
