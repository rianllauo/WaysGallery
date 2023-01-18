import Navbar from "../components/ Navbar";
import React from "react";
import { useQuery } from "react-query";
import { API } from "../config/api";
import { Link } from "react-router-dom";

// icon
import search from "../assets/icons/search.svg";
import { Spinner } from "flowbite-react";

const Home = () => {
    const { data: post, isLoading } = useQuery("post", async () => {
        const response = await API.get("/post");
        return response.data.data;
    });

    const postTubmnail = post?.map((item) => {
        return item.images[0];
    });

    console.log(postTubmnail);

    return (
        <div>
            <Navbar />

            <div className="w-full pt-8 md:max-w-screen-md lg:max-w-screen-lg mx-auto">
                <div className=" flex justify-between items-center">
                    <div>
                        <select
                            id="countries"
                            className="bg-gray-200 border-none text-gray-600 text-xs rounded-md focus:ring-0 focus:border-none block w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                        >
                            <option value="today">Todays</option>
                            <option value="US">Followed</option>
                        </select>
                    </div>

                    <div>
                        <form className="flex items-center">
                            <div className="relative w-full">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <img src={search} alt="search" />
                                </div>
                                <input
                                    type="text"
                                    id="simple-search"
                                    className="w-48 bg-gray-200 border-none text-gray-900 text-xs rounded-lg focus:ring-0 focus:border-none block pl-10   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Search"
                                />
                            </div>
                        </form>
                    </div>
                </div>

                <div className="pt-8 font-medium">
                    <h1>today's post</h1>

                    {isLoading ? (
                        <div className="w-full flex justify-center items-center">
                            <Spinner aria-label="Default status example" />
                        </div>
                    ) : (
                        <div className="pt-8 grid grid-cols-4 gap-3">
                            {post?.map((item) => (
                                <Link to={`/detail/${item.id}`} key={item.id}>
                                    {item.images
                                        ?.map((img, index) => (
                                            <img
                                                key={index}
                                                src={img.image}
                                                alt="mantap"
                                                width="250px"
                                                height="200px"
                                            />
                                        ))
                                        .shift()}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
