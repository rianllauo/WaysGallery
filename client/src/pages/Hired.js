import { Button, Textarea, TextInput } from "flowbite-react";

import React, { useEffect, useRef, useState } from "react";
import { useMutation } from "react-query";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/ Navbar";
import { API } from "../config/api";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";

const Hired = () => {
    const ref1 = useRef();
    const ref2 = useRef();
    const { id } = useParams();
    const [form, setForm] = useState({
        title: "",
        description: "",
        start_date: "",
        end_date: "",
        price: "",
        order_toId: "",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleChangePrice = (e) => {
        setForm({
            ...form,
            price: Number(e.target.value),
        });
    };

    const handleChangeDate = (e) => {
        setForm({
            ...form,
            [e.target.name]: moment(e.target.value).format("DD MMMM YYYY"),
        });
    };

    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault();

            const config = {
                Headers: {
                    "Content-type": "application/json",
                },
            };

            const response = await API.post("/hired", form, config);

            console.log(response);
        } catch (error) {
            console.log(error);
        }
    });

    useEffect(() => {
        setForm({
            ...form,
            order_toId: Number(id),
        });
    }, []);

    return (
        <div>
            <Navbar />

            <div className="w-full py-8 mx-auto md:max-w-screen-md">
                <form
                    onSubmit={(e) => handleSubmit.mutate(e)}
                    className="flex flex-col gap-4"
                >
                    <ToastContainer
                        position="top-center"
                        autoClose={5000}
                        hideProgressBar
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                    />
                    <div>
                        <TextInput
                            name="title"
                            type="text"
                            placeholder="Title"
                            required={true}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <Textarea
                            name="description"
                            placeholder="Description"
                            required={true}
                            rows={5}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex items-center justify-between gap-5">
                        <TextInput
                            name="start_date"
                            className="w-full"
                            ref={ref1}
                            type="text"
                            placeholder="End Project"
                            onFocus={() => (ref1.current.type = "date")}
                            onBlur={() => (ref1.current.type = "date")}
                            required={true}
                            onChange={handleChangeDate}
                        />
                        <TextInput
                            name="end_date"
                            className="w-full"
                            ref={ref2}
                            type="text"
                            placeholder="End Project"
                            onFocus={() => (ref2.current.type = "date")}
                            onBlur={() => (ref2.current.type = "date")}
                            required={true}
                            onChange={handleChangeDate}
                        />
                    </div>
                    <div>
                        <TextInput
                            name="price"
                            type="number"
                            placeholder="Price"
                            required={true}
                            onChange={handleChangePrice}
                        />
                    </div>

                    <div className="flex items-center justify-center py-6 gap-2">
                        <Link
                            to="/"
                            className="px-5 py-1.5 rounded text-slate-600 font-medium text-xs bg-gray-300"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            className="px-5 py-1.5 rounded text-white text-xs font-medium bg-[#2FC4B2]"
                        >
                            Bidding
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Hired;
