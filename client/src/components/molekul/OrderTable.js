import { Table } from "flowbite-react";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { API } from "../../config/api";
import moment from "moment";
import { Link } from "react-router-dom";

const OrderTable = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    const { data: hiredOrder, isLoading } = useQuery("hiredOffer", async () => {
        const response = await API.get(`/hired-user-order/${user.id}`);
        return response.data.data;
    });

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
                    {hiredOrder?.map((item, index) => {
                        return (
                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {index + 1}
                                </Table.Cell>
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {item.order_by.full_name}
                                </Table.Cell>
                                <Table.Cell>{item.title}</Table.Cell>
                                <Table.Cell>
                                    {moment(item.start_date).format(
                                        "DD MMMM YYYY"
                                    )}
                                </Table.Cell>
                                <Table.Cell>
                                    {moment(item.end_date).format(
                                        "DD MMMM YYYY"
                                    )}
                                </Table.Cell>
                                <Table.Cell>{item.status}</Table.Cell>
                                <Table.Cell>
                                    {item.status === "Waiting Accept" ? (
                                        <a
                                            href="/tables"
                                            className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                                        >
                                            Waiting Accept
                                        </a>
                                    ) : (
                                        <></>
                                    )}
                                    {item.status == "Been Working" ? (
                                        <Link to={`/send-project/${item.id}`}>
                                            <button className="px-4 py-1.5 rounded text-white bg-blue-500 text-xs">
                                                Chat Vendor
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
                                            Cancel
                                        </p>
                                    ) : (
                                        <></>
                                    )}
                                    {item.status == "Finish" ? (
                                        <Link to={`/see-project/${item.id}`}>
                                            <button className="px-4 py-1.5 rounded text-white bg-green-500 text-xs">
                                                See Project
                                            </button>
                                        </Link>
                                    ) : (
                                        <></>
                                    )}
                                </Table.Cell>
                            </Table.Row>
                        );
                    })}
                </Table.Body>
            </Table>
        </div>
    );
};

export default OrderTable;
