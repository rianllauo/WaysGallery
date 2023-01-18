import React, { useContext, useState } from "react";
import { Alert, Modal, TextInput } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { API } from "../../config/api";
import { useMutation } from "react-query";

const Register = ({ show, handleClose }) => {
    const navigate = useNavigate();
    const [state, dispatch] = useContext(UserContext);
    const [alert, setAlert] = useState();

    const [form, setForm] = useState({
        full_name: "",
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
            const response = await API.post("/register", body, config);

            if (response.status === 200) {
                setAlert(
                    <Alert color="success">
                        <span>Register successfully</span>
                    </Alert>
                );
            }
            // navigate(0);
        } catch (error) {
            // const alert = (
            //     <Alert variant="danger" className="py-1">
            //         Failed
            //     </Alert>
            // );
            // setMessage(alert);
            console.log(error);
        }
    });

    return (
        <div>
            <Modal show={show} size="sm" popup={true} onClose={handleClose}>
                <Modal.Header />
                <Modal.Body>
                    <div className="p-0">
                        <h1 className="text-xl font-semibold text-[#2FC4B2]">
                            Register
                        </h1>
                        {alert}
                        <form
                            onSubmit={(e) => handleSubmit.mutate(e)}
                            className="flex flex-col gap-4 mt-6"
                        >
                            <div>
                                <TextInput
                                    name="full_name"
                                    type="text"
                                    placeholder="FullName"
                                    required={true}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <TextInput
                                    name="email"
                                    type="email"
                                    placeholder="Email"
                                    required={true}
                                    onChange={handleChange}
                                    className="outline-none"
                                />
                            </div>
                            <div>
                                <TextInput
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    required={true}
                                    onChange={handleChange}
                                />
                            </div>

                            <button
                                type="submit"
                                className="px-4 py-2 mt-3 rounded-md text-white font-medium bg-[#2FC4B2] text-xs lg:text-sm"
                            >
                                Register
                            </button>
                        </form>
                        <p className="text-xs text-center mt-4">
                            Already have an account ? Klik Here
                        </p>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default Register;
