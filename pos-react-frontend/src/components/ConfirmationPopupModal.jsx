/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { AlertCircle } from 'react-feather';

export default function PopupModal({ isOpen, onYes, onNo, popupMessage }) {
    return (
        <div className={`${!isOpen && 'hidden'}`}>
            <div
                id="popup-modal"
                tabIndex="-1"
                className="fixed top-1/2 left-1/2  justify-center items-center w-1/4 transform -translate-x-60 -translate-y-40"
            >
                <div className="relative p-4 w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="p-4 md:p-5 text-center">
                            <AlertCircle className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" />

                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                {popupMessage}
                            </h3>
                            <div className=" flex gap-2 justify-center">
                                <button
                                    onClick={onYes}
                                    data-modal-hide="popup-modal"
                                    type="button"
                                    className="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                                >
                                    YA
                                </button>
                                <button
                                    onClick={onNo}
                                    data-modal-hide="popup-modal"
                                    type="button"
                                    className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                                >
                                    TIDAK
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
