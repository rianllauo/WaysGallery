import React from "react";
import { Link, Outlet, Route, Routes } from "react-router-dom";
import Navbar from "../components/ Navbar";
import { Menu, Transition } from "@headlessui/react";

import OfferTable from "../components/molekul/OfferTable";
import OrderTable from "../components/molekul/OrderTable";

const Transaction = () => {
    return (
        <div>
            <Navbar />

            <div className="w-full mx-auto py-8 md:max-w-screen-md lg:max-w-screen-lg">
                <Menu as="div" className="relative inline-block text-left z-20">
                    <div>
                        <Menu.Button className="inline-flex w-full justify-center rounded-md bg-gray-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                            Order
                        </Menu.Button>
                    </div>
                    <Transition
                        // as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute left-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="px-1 py-1 ">
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            className={`${
                                                active
                                                    ? "bg-violet-500 text-white"
                                                    : "text-gray-900"
                                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                        >
                                            <Link to="order">Order</Link>
                                        </button>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            className={`${
                                                active
                                                    ? "bg-violet-500 text-white"
                                                    : "text-gray-900"
                                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                        >
                                            <Link to="offer">Offer</Link>
                                        </button>
                                    )}
                                </Menu.Item>
                            </div>
                        </Menu.Items>
                    </Transition>
                </Menu>

                <div className="pt-14">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Transaction;
