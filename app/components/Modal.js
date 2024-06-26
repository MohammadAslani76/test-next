"use client"

import {useRef} from "react";

const Modal = ({ isOpen, onClose, children }) => {

    const modalRef = useRef(null);

    if (!isOpen) {
        return null;
    }

    const handleCloseOutsideClick = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50" onClick={handleCloseOutsideClick}>
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div className="relative bg-gray-700 rounded-lg p-8" ref={modalRef}>
                <div className="absolute top-0 right-0 p-2">
                    <button className="text-red-500 hover:text-red-400 transition-all" onClick={onClose}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
                <div className="my-3">{children}</div>
            </div>
        </div>
    );
};

export default Modal;