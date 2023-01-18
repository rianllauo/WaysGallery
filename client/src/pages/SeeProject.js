import { Button, Card, Carousel } from "flowbite-react";
import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Navbar from "../components/ Navbar";
import { API } from "../config/api";
import { FormatRupiah } from "@arismun/format-rupiah";

const SeeProject = () => {
    const { id } = useParams();
    const { data: project } = useQuery("project", async () => {
        const response = await API.get(`project-hired/${id}`);
        return response.data.data;
    });

    console.log(project);

    return (
        <div>
            <Navbar />
            <div className="w-full py-12 mx-auto md:max-w-screen-md flex items-center justify-between gap-5">
                <Card className="w-full">
                    <div className="flex justify-between items-center gap-12">
                        <div className="">
                            <h5 className="text-2xl mb-3 font-semibold tracking-tight text-gray-900 dark:text-white">
                                {project?.hired.title}
                            </h5>
                            <p className="font-normal text-gray-700 dark:text-gray-400">
                                {project?.hired.description}
                            </p>
                        </div>
                        <div>
                            <h5 className="text-xl font-semibold tracking-tight text-red-600 dark:text-white">
                                <FormatRupiah value={project?.hired.price} />
                            </h5>
                        </div>
                    </div>

                    <div className="w-full h-[1px] bg-gray-300"></div>
                    <div className="flex justify-between items-center gap-12">
                        <div>
                            <p className="mb-3 text-lg font-semibold text-gray-900 dark:text-gray-400">
                                Here your project
                            </p>
                            <p className="font-normal text-gray-700 dark:text-gray-400">
                                {project?.description}
                            </p>
                        </div>
                        <div>
                            <a
                                href={project?.file}
                                className="px-4 py-2 rounded-md text-white text-sm bg-blue-500"
                            >
                                Download
                            </a>
                        </div>
                    </div>
                </Card>

                {/* <Card>
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Noteworthy technology acquisitions 2021
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                        Here are the biggest enterprise technology acquisitions
                        of 2021 so far, in reverse chronological order.
                    </p>
                    <Button>
                        Read more
                        <svg
                            className="ml-2 -mr-1 h-4 w-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </Button>
                </Card> */}
            </div>
        </div>
    );
};

export default SeeProject;
