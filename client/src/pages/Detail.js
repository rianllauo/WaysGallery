import { Avatar, Carousel } from "flowbite-react";
import React from "react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/ Navbar";
import { API } from "../config/api";

const Detail = () => {
    const { id } = useParams();

    const { data: postDetail } = useQuery("postDetail", async () => {
        const response = await API.get(`/post/${id}`);
        return response.data.data;
    });

    return (
        <div>
            <Navbar />

            <div className=" py-8 max-w-screen-sm mx-auto">
                <div className="w-full flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link to={`/detail-user/${postDetail?.user.id}`}>
                            <Avatar
                                img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                                rounded={true}
                                size="md"
                            />
                        </Link>
                        <div>
                            <h1 className="font-medium">{postDetail?.title}</h1>
                            <h1 className="text-xs text-gray-600">
                                {postDetail?.user.full_name}
                            </h1>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button className="px-4 py-1.5 rounded bg-gray-300 text-xs font-medium">
                            Follow
                        </button>
                        <Link to={`/hired/${postDetail?.user.id}`}>
                            <button className="px-5 py-1.5 rounded bg-[#2FC4B2] text-white text-xs font-medium">
                                Hire
                            </button>
                        </Link>
                    </div>
                </div>

                <div className="pt-8">
                    <Carousel className="h-56 sm:h-64 xl:h-80 2xl:h-96">
                        {postDetail?.images.map((item, index) => (
                            <img key={index} src={item.image} alt="image" />
                        ))}
                    </Carousel>

                    <div className="mt-3">
                        <h3 className="font-semibold">
                            Say Hello{" "}
                            <span className="text-[#2FC4B2]">
                                {postDetail?.user.email}
                            </span>
                        </h3>
                        <p className="mt-3">{postDetail?.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Detail;
