import React, { useState } from "react";

// image & icons
import waysLogo from "../assets/icons/waysTitle.svg";
import topLeft from "../assets/icons/homeAnimTopLeft.svg";
import botLeft from "../assets/icons/homeAnimBotLeft.svg";
import botRight from "../assets/icons/homeAnimBotRight.svg";
import homeAnim from "../assets/images/homeAnim.svg";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";

const Auth = () => {
    // show modal register & login
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

    const handleShowLogin = () => {
        setShowLogin(true);
    };
    const handleShowRegister = () => {
        setShowRegister(true);
    };

    const handleCloseLogin = () => {
        setShowLogin(false);
    };
    const handleCloseRegister = () => {
        setShowRegister(false);
    };

    return (
        <div className="relative">
            <div className="absolute -top-0 -left-0 w-28 md:w-64">
                <img src={topLeft} alt="" />
            </div>

            <div className="absolute bottom-0 -left-0 w-28 md:w-64">
                <img src={botLeft} alt="" />
            </div>

            <div className="absolute bottom-0 right-0 w-28 md:w-64">
                <img src={botRight} alt="" />
            </div>

            <div className="relative p-6 pt-16 pb-16 md:pb-6 md:pt-6">
                <div className="w-full h-full mx-auto flex flex-col justify-between items-center gap-14 md:max-w-screen-md md:flex-row  md:h-screen lg:max-w-screen-lg">
                    <div className="w-full flex flex-col justify-center items-start">
                        <img
                            src={waysLogo}
                            alt="logo"
                            className="w-40 lg:w-64"
                        />
                        <h1 className="text-base font-medium mt-4 leading-5 lg:">
                            show your work to inspire everyone
                        </h1>
                        <p className="mt-2 text-xs text-gray-600">
                            Ways Exhibition is a website design creators gather
                            to share their work with other creators
                        </p>
                        <div className="mt-4 flex gap-2">
                            <button
                                className="px-4 py-1.5 rounded-md text-white font-medium bg-[#2FC4B2] text-xs lg:text-sm"
                                onClick={handleShowRegister}
                            >
                                Join Now
                            </button>
                            <button
                                className="px-4 py-1.5 rounded-md text-slate-800 font-medium bg-[#E7E7E7] text-xs lg:text-sm"
                                onClick={handleShowLogin}
                            >
                                Login
                            </button>
                        </div>
                    </div>
                    <div className="w-full flex justify-center items-center">
                        <img src={homeAnim} className="w-[600px]" alt="" />
                    </div>
                </div>
            </div>

            <Login show={showLogin} handleClose={handleCloseLogin} />
            <Register show={showRegister} handleClose={handleCloseRegister} />
        </div>
    );
};

export default Auth;
