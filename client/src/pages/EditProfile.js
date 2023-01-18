import { Avatar, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/ Navbar";
import { API } from "../config/api";

// firebse
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

const EditProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [profile, setProfile] = useState({
        full_name: "",
        avatar: "",
        greeting: "",
        arts: "",
    });

    const [imageUpload, setImageUpload] = useState(null);
    const [img, setImg] = useState();
    const [alert, setAlert] = useState("d-none");

    const handleChange = (e) => {
        setProfile({
            ...profile,
            [e.target.name]: e.target.value,
        });
    };

    const handleChangeImage = (e) => {
        setImageUpload(e.target.files[0]);
    };

    const uploadImage = () => {
        if (imageUpload == null) return;

        const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);

        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            // setAlert("");
            getDownloadURL(snapshot.ref).then((url) => {
                setImg(url);
            });
        });
    };

    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault();

            const body = JSON.stringify(profile);
            const response = await API.patch(`/user/${id}`, body);
            console.log(response);
            if (response.status === 200) {
                // alert("Profile updated successfully");
                setProfile({
                    full_name: "",
                    greeting: "",
                });
                navigate("/profile");
            } else {
                alert("Profile failed update");
            }
        } catch (error) {
            console.log(error);
        }
    });

    useEffect(() => {
        setProfile({
            ...profile,
            arts: img,
        });
    }, [img]);

    return (
        <div>
            <Navbar />
            <div className="w-full pt-8 mx-auto md:max-w-screen-md ">
                <div className="flex justify-between items-center gap-12">
                    <div className="w-full">
                        {" "}
                        <form>
                            <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
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
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
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
                            <button
                                type="button"
                                onClick={uploadImage}
                                className="px-5 py-1.5 rounded text-white text-xs font-medium bg-[#2FC4B2]"
                            >
                                Upload Image
                            </button>
                        </form>
                    </div>

                    <div className="w-full">
                        <div className="flex flex-col gap-3 items-center justify-center">
                            <Avatar rounded={true} size="lg" />
                            {/* <button
                                type="submit"
                                className="px-5 py-1.5 rounded text-white text-xs font-medium bg-[#2FC4B2]"
                            >
                                Change Profile
                            </button> */}
                        </div>
                        <form
                            onSubmit={(e) => handleSubmit.mutate(e)}
                            className="flex flex-col gap-4 mt-6"
                        >
                            <div>
                                <TextInput
                                    name="greeting"
                                    type="text"
                                    placeholder="Greeting"
                                    value={profile?.greeting}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <TextInput
                                    name="full_name"
                                    type="text"
                                    placeholder="Full Name"
                                    value={profile?.full_name}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="flex items-center ">
                                <button
                                    type="submit"
                                    className="px-5 py-1.5 rounded text-white text-xs font-medium bg-[#2FC4B2]"
                                >
                                    Save Change
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;
