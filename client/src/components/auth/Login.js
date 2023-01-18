import React, { useContext, useState } from "react";
import { Modal, TextInput } from "flowbite-react";
import { redirect, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { API } from "../../config/api";
import { useMutation } from "react-query";

const Login = ({ show, handleClose }) => {
    const navigate = useNavigate();
    const [state, dispatch] = useContext(UserContext);

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault();

            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            const body = JSON.stringify(form);
            const response = await API.post("/login", body, config);

            if (response?.status === 200) {
                dispatch({
                    type: "LOGIN_SUCCESS",
                    payload: response.data.data,
                });

                // if (response.data.data.status === "admin") {
                //     navigate("/admin");
                // } else {
                //     navigate("/");
                // }

                // setMessage(
                //     Swal.fire({
                //         icon: "success",
                //         title: "Successfully Login",
                //     })
                // );
                // redirect("/");
            }
        } catch (error) {
            // if (error.response.data.message == "wrong email or password") {
            //     // const alert = (
            //     //     <Alert className="py-2 px-5 bg-rose-500 ">
            //     //         <p className="text-white font-medium text-sm">
            //     //             Email atau Password Salah
            //     //         </p>
            //     //     </Alert>
            //     // );
            //     // setMessage(alert);
            // }

            // if (error.response.data.message == "record not found") {
            //     const alert = (
            //         <Alert className="py-2 px-5 bg-rose-500 ">
            //             <p className="text-white font-medium text-sm">
            //                 Akun Tidak di Temukan
            //             </p>
            //         </Alert>
            //     );
            //     setMessage(alert);
            // }

            console.log(error.response.data);
        }
    });

    return (
        <div>
            <Modal show={show} size="sm" popup={true} onClose={handleClose}>
                <Modal.Header />
                <Modal.Body>
                    <div className="p-0">
                        <h1 className="text-xl font-semibold text-[#2FC4B2]">
                            Login
                        </h1>
                        <form
                            onSubmit={(e) => handleSubmit.mutate(e)}
                            className="flex flex-col gap-4 mt-6"
                        >
                            <div>
                                <TextInput
                                    name="email"
                                    type="email"
                                    placeholder="Masukan Email"
                                    required={true}
                                    onChange={handleChange}
                                    className="outline-none"
                                />
                            </div>
                            <div>
                                <TextInput
                                    name="password"
                                    type="password"
                                    placeholder="Masukan Password"
                                    onChange={handleChange}
                                    required={true}
                                />
                            </div>
                            <button
                                type="submit"
                                className="px-4 py-2 rounded-md text-white font-medium bg-[#2FC4B2] text-xs lg:text-sm"
                            >
                                Login
                            </button>
                        </form>
                        <p className="text-xs text-center mt-4">
                            Don't have an account ? Klik Here
                        </p>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default Login;
