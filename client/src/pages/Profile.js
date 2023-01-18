import React from "react";
import Navbar from "../components/ Navbar";
import { Avatar } from "flowbite-react";
import { useQuery } from "react-query";
import { API } from "../config/api";

// icon & image
import rectangle from "../assets/icons/Rectangle.svg";
import profileArt from "../assets/images/profile-arts.png";
import { Link } from "react-router-dom";

const Profile = () => {
    const userID = JSON.parse(localStorage.getItem("user"));

    const { data: user } = useQuery("userProfile", async () => {
        const response = await API.get(`/user/${userID.id}`);
        return response.data.data;
    });

    const post = user?.post.map((item) => {
        return item;
    });

    return (
        <div className="w-screen h-screen">
            <Navbar />
            <div className="relative w-full  overflow-hidden">
                <div className="absolute -right-16 top-0 -z-10">
                    <img
                        src={rectangle}
                        alt="rectangle"
                        className=" h-[400px]"
                    />
                </div>
                <div className="w-full pt-16 md:max-w-screen-md lg:max-w-screen-lg mx-auto ">
                    <div className="flex justify-between items-start gap-3">
                        <div className="w-full flex flex-col items-start">
                            <Avatar
                                img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                                rounded={true}
                                size="lg"
                            />
                            <h3 className="py-4 font-medium text-xl">
                                {user?.full_name}
                            </h3>
                            <h1 className="text-5xl font-semibold w-[90%] ">
                                {user?.greeting}
                            </h1>
                            <Link to={`/edit-profile/${user?.id}`}>
                                <button className="mt-12 px-4 py-1.5 rounded text-white bg-[#2FC4B2] text-xs">
                                    Edit Profile
                                </button>
                            </Link>
                        </div>
                        <div className="w-full">
                            <img
                                src={user?.arts}
                                alt="art"
                                className="w-[640px]"
                            />
                        </div>
                    </div>

                    <div className="py-16">
                        <h3 className="text-lg font-medium">My Works</h3>
                        <div className="flex items-center gap-4 pt-6">
                            {post?.map((item) => {
                                return item.images
                                    ?.map((item) => {
                                        return (
                                            <img
                                                key={item.id}
                                                src={item.image}
                                                alt="art"
                                            />
                                        );
                                    })
                                    .shift();
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
