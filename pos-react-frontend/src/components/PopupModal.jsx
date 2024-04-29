/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { CheckCircle } from 'react-feather';

export default function PopupModal({ isOpen, onClose, popupMessage }) {
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
                            <CheckCircle className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" />

                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                {popupMessage}
                            </h3>
                            <button
                                onClick={onClose}
                                data-modal-hide="popup-modal"
                                type="button"
                                className="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                            >
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
