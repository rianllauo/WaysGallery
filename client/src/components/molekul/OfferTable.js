import { Table } from "flowbite-react";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { API } from "../../config/api";
import moment from "moment";
import { Link } from "react-router-dom";
import ModalDetailProject from "./ModalDetailProject";

const OfferTable = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const [show, setShow] = useState(false);
    const [dataOffer, setDataOffer] = useState();

    const handleShow = (data) => {
        setShow(true);
        setDataOffer(data);
    };
    const handleClose = () => {
        setShow(false);
    };

    const {
        data: hiredOffer,
        isLoading,
        refetch,
    } = useQuery("hiredOffer", async () => {
        const response = await API.get(`/hired-user/${user.id}`);
        return response.data.data;
    });

    const updateStatusCancle = async (id) => {
        const body = {
            status: "Cancle",
        };
        const response = await API.patch(`/hired/${id}`, body);
        console.log(response);
        refetch();
    };

    const updateStatusApprove = async (id) => {
        const body = {
            status: "Been Working",
        };
        const response = await API.patch(`/hired/${id}`, body);
        console.log(response);
        refetch();
    };

    return (
        <div>
            <Table>
                <Table.Head>
                    <Table.HeadCell>No</Table.HeadCell>
                    <Table.HeadCell>Vendor</Table.HeadCell>
                    <Table.HeadCell>Order</Table.HeadCell>
                    <Table.HeadCell>Start Project</Table.HeadCell>
                    <Table.HeadCell>End Project</Table.HeadCell>
                    <Table.HeadCell>Status</Table.HeadCell>
                    <Table.HeadCell>Action</Table.HeadCell>
                    <Table.HeadCell>
                        <span className="sr-only">Edit</span>
                    </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {hiredOffer?.map((item, index) => {
                        return (
                            <>
                                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {index + 1}
                                    </Table.Cell>
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {item.order_to.full_name}
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Link
                                            to={item.id}
                                            onClick={() => handleShow(item)}
                                        >
                                            {item.title}
                                        </Link>

                                        <p>{item.id}</p>
                                    </Table.Cell>

                                    <Table.Cell>
                                        {" "}
                                        {moment(item.start_date).format(
                                            "DD MMMM YYYY"
                                        )}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {" "}
                                        {moment(item.end_date).format(
                                            "DD MMMM YYYY"
                                        )}
                                    </Table.Cell>
                                    <Table.Cell>{item.status}</Table.Cell>
                                    <Table.Cell
                                        onClick={() => updateStatusCancle()}
                                    >
                                        {item.status == "Waiting Accept" ? (
                                            <div className="w-full flex items-center gap-2">
                                                <button
                                                    onClick={() =>
                                                        updateStatusCancle(
                                                            item.id
                                                        )
                                                    }
                                                    className="px-4 py-1.5 rounded text-white bg-red-500 text-xs"
                                                >
                                                    Cancle
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        updateStatusApprove(
                                                            item.id
                                                        )
                                                    }
                                                    className="px-4 py-1.5 rounded text-white bg-green-500 text-xs"
                                                >
                                                    Approve
                                                </button>
                                            </div>
                                        ) : (
                                            <></>
                                        )}
                                        {item.status == "Been Working" ? (
                                            <Link
                                                to={`/send-project/${item.id}`}
                                            >
                                                <button className="px-4 py-1.5 rounded text-white bg-blue-500 text-xs">
                                                    Send Project
                                                </button>
                                            </Link>
                                        ) : (
                                            <></>
                                        )}
                                        {item.status == "Success" ? (
                                            <p className="text-semibold text-green-500">
                                                Finish
                                            </p>
                                        ) : (
                                            <></>
                                        )}
                                        {item.status == "Cancle" ? (
                                            <p className="text-semibold text-red-500">
                                                Cancle
                                            </p>
                                        ) : (
                                            <></>
                                        )}
                                        {item.status == "Finish" ? (
                                            <p className="text-semibold text-green-500">
                                                Finish
                                            </p>
                                        ) : (
                                            <></>
                                        )}
                                    </Table.Cell>
                                </Table.Row>
                            </>
                        );
                    })}
                    {show && (
                        <ModalDetailProject
                            id={dataOffer.id}
                            show={show}
                            handleClose={handleClose}
                        />
                    )}
                </Table.Body>
            </Table>
        </div>
    );
};

export default OfferTable;
