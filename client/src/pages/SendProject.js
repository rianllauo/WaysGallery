import { Alert, Spinner, Textarea } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/ Navbar";
import { API } from "../config/api";

// firebase
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

const SendProject = () => {
    const { id } = useParams();
    const [form, setForm] = useState({
        description: "",
        file: "",
        hired_id: "",
    });

    const [images, setImages] = useState([]);
    const [urls, setUrls] = useState();
    const [progress, setProgress] = useState();

    const handleChangeImage = (e) => {
        for (let i = 0; i < e.target.files.length; i++) {
            const newImage = e.target.files[i];
            newImage["id"] = Math.random();
            setImages((prevState) => [...prevState, newImage]);
        }
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleUpload = () => {
        if (images.length === 0) return;
        setProgress(
            <div className="flex items-center gap-3 my-3">
                <Spinner color="success" aria-label="Success spinner example" />
                <span>Uploading...</span>
            </div>
        );
        images.map((image) => {
            const imageRef = ref(storage, `images/${image.name + v4()}`);

            uploadBytes(imageRef, image).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((urls) => {
                    setUrls(urls);
                });
                setProgress(
                    <Alert color="success" className="mt-2">
                        <span>Upload Finish</span>
                    </Alert>
                );
            });
        });
        setImages([]);
    };

    const updateStatus = async () => {
        const body = {
            status: "Finish",
        };
        const response = await API.patch(`/hired/${id}`, body);
        console.log(response);
    };

    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault();

            const config = {
                Headers: {
                    "Content-type": "application/json",
                },
            };

            const response = await API.post("/project", form, config);

            if (response.status === 200) {
                updateStatus();
            }
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    });

    useEffect(() => {
        setForm({ ...form, file: urls });
    }, [urls]);

    useEffect(() => {
        setForm({ ...form, hired_id: Number(id) });
    }, []);

    console.log(form);
    return (
        <div>
            <Navbar />
            <div className="py-8 w-full md:max-w-screen-md mx-auto flex justify-between gap-8">
                <div className="flex flex-col gap-3 items-center justify-center w-full">
                    <label
                        for="dropzone-file"
                        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg
                                aria-hidden="true"
                                className="w-10 h-10 mb-3 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                ></path>
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                <span className="font-semibold">
                                    Click to upload
                                </span>{" "}
                                or drag and drop
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                SVG, PNG, JPG or GIF (MAX. 800x400px)
                            </p>
                        </div>
                        <input
                            id="dropzone-file"
                            onChange={handleChangeImage}
                            type="file"
                            className="hidden"
                        />
                    </label>
                    {progress}

                    <button
                        onClick={handleUpload}
                        className="px-5 py-1.5 rounded text-white text-xs font-medium bg-[#2FC4B2]"
                    >
                        Upload File
                    </button>
                </div>

                <div className="w-full">
                    <form
                        onSubmit={(e) => handleSubmit.mutate(e)}
                        className="flex flex-col gap-4"
                    >
                        <div>
                            <Textarea
                                name="description"
                                placeholder="Description"
                                onChange={handleChange}
                                required={true}
                                rows={5}
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                type="submit"
                                className="px-5 py-1.5 rounded text-white text-xs font-medium bg-[#2FC4B2]"
                            >
                                Send Project
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SendProject;
