import { Avatar, Dropdown } from "flowbite-react";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logoNavbar from "../assets/icons/logoNavbar.png";
import { UserContext } from "../context/userContext";

const Navbar = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const [state, dispatch] = useContext(UserContext);

    const logout = () => {
        dispatch({
            type: "LOGOUT",
        });
    };

    return (
        <div className="px-6 py-4 border-b border-slate-200">
            <div className="w-full md:max-w-screen-md lg:max-w-screen-lg mx-auto flex justify-between items-center">
                <div>
                    <Link to="/">
                        <img src={logoNavbar} alt="logo" className="w-[90px]" />
                    </Link>
                </div>
                <div className="flex items-center gap-4">
                    <Link
                        to="/upload-post"
                        className="py-1.5 px-4 rounded-md bg-[#2FC4B2] text-white font-medium text-xs"
                    >
                        Upload
                    </Link>
                    <Dropdown
                        label={
                            <Avatar
                                alt="User settings"
                                img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                                rounded={true}
                            />
                        }
                        arrowIcon={false}
                        inline={true}
                    >
                        <Dropdown.Header>
                            <span className="block text-sm">
                                {user.full_name}
                            </span>
                            <span className="block truncate text-sm font-medium">
                                {user.email}
                            </span>
                        </Dropdown.Header>

                        <Dropdown.Item>
                            <Link to="/profile">Profile</Link>
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <Link to={`/transaction/${user.id}/order`}>
                                Order
                            </Link>
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <button
                                onClick={logout}
                                className="text-red-500 font-medium"
                            >
                                Logout
                            </button>
                        </Dropdown.Item>
                    </Dropdown>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
