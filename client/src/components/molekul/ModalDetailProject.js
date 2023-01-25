import { FormatRupiah } from "@arismun/format-rupiah";
import { Modal } from "flowbite-react";
import React from "react";

const ModalDetailProject = ({ data, show, handleClose }) => {
    return (
        <Modal show={show} onClose={handleClose}>
            {/* <Modal.Header>
                <h1>Detail Project</h1>
            </Modal.Header> */}
            <Modal.Body>
                <div className="space-y-6 text-gray-600">
                    <h5>Title : {data.title}</h5>

                    <p>Description : {data.description}</p>
                    <h5 className="text-xl font-semibold tracking-tight text-green-600 dark:text-white">
                        <FormatRupiah value={data.price} />
                    </h5>

                    <div className="w-full flex justify-end">
                        <div className="flex gap-3">
                            <button
                                onClick={handleClose}
                                className="px-4 py-1.5 rounded bg-gray-600 text-white text-sm"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default ModalDetailProject;
