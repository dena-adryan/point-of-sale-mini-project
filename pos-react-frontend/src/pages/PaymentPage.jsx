/* eslint-disable no-unused-vars */
// import React from 'react';

import SelectedProduct from '../components/SelectedProduct';
import ProductCard from '../components/ProductCard';
import Title from '../components/Title';
import Header from '../layouts/Header';

import { useLocation } from 'react-router-dom';
import OrderDetailsCard from '../components/OrderDetailsCard';
import PopupModal from '../components/PopupModal';

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

export default function PaymentPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const selectedProducts = JSON.parse(location.state.selectedProducts);
    const totalPrice = JSON.parse(location.state.totalPrice);
    const [change, setChange] = useState(0);
    const [paidAmount, setPaidAmount] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handlePaidAmountChange = (event) => {
        setPaidAmount(event.target.value);
        if (event.target.value > totalPrice) {
            setChange(event.target.value - totalPrice);
        } else {
            setChange(0);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        navigate('/');
    };

    const handleShowPopUp = () => {
        console.log('popup muncul');
        setIsModalOpen(true);
    };

    const handleAddTransaction = () => {
        const currentDateTime = new Date();

        const transaction_date = currentDateTime.toISOString();
        const total_amount = totalPrice;
        const total_pay = document.getElementById('paid').value;
        const transaction_details = [];
        selectedProducts.forEach((product) => {
            const detail = {
                product_id: product.id,
                quantity: product.quantity,
                subtotal: product.price * product.quantity,
            };
            transaction_details.push(detail);
        });

        const newTransactionData = {
            transaction_date,
            total_amount,
            total_pay,
            transaction_details,
        };

        axios
            .post(
                'http://localhost:8080/pos/api/transaction',
                newTransactionData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            )
            .then((response) => {
                if (response.status === 200) {
                    console.log('Transaction finished successfully');
                    setIsModalOpen(true);
                } else {
                    throw new Error('Transaction failed');
                }
            })
            .catch((error) => {
                console.error('Transaction error :', error);
            });
    };

    return (
        <div className=" bg-yellow-100 min-h-screen">
            <div className="flex flex-col h-full w-3/4 mx-auto">
                <Header />
                <div className=" basis-11/12 flex flex-row bg-orange-100">
                    <div className="flex flex-col basis-8/12 bg-orange-200 m-4 rounded-3xl">
                        <div className=" m-4 bg-orange-200 basis-2/12 flex flex-row ">
                            <Title title="Rincian Pesanan" />
                        </div>
                        <div className=" m-4 bg-orange-200 basis-10/12 grid grid-cols-1 p-4">
                            <ul>
                                {selectedProducts.map((product, index) => (
                                    <li key={index}>
                                        <OrderDetailsCard product={product} />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className=" basis-4/12 bg-orange-200 m-4 flex flex-col rounded-3xl">
                        <div className=" h-full bg-orange-200 m-4 flex flex-col p-2 place-content-between">
                            <div className=" basis-3/12 bg-orange-200 m-2 ">
                                <h1 className=" text-4xl font-bold">
                                    Pembayaran
                                </h1>
                                <h2 className=" font-bold text-orange-950 text-3xl">
                                    Total : Rp. {totalPrice}
                                </h2>
                            </div>
                            <div className=" basis-3/12 bg-orange-200 m-2 flex flex-col p-2">
                                <label
                                    className=" text-2xl font-bold"
                                    htmlFor="paid"
                                >
                                    Dibayar
                                </label>
                                <input
                                    type="number"
                                    id="paid"
                                    name="paid"
                                    required
                                    value={paidAmount}
                                    onChange={handlePaidAmountChange}
                                />
                            </div>
                            <div className=" basis-3/12 bg-orange-200 m-2 flex flex-col p-2">
                                <h2 className=" text-2xl font-bold">
                                    Kembalian : {change}
                                </h2>
                            </div>
                            <div className=" basis-1/12 0 m-2 flex content-center justify-center">
                                <button
                                    className=" min-h-16 text-white font-bold rounded-lg  w-full h-full disabled:bg-green-900 hover:bg-green-600 bg-green-700"
                                    onClick={handleAddTransaction}
                                    disabled={totalPrice > paidAmount}
                                >
                                    Selesaikan
                                </button>

                                <PopupModal
                                    isOpen={isModalOpen}
                                    onClose={handleCloseModal}
                                    popupMessage="Pembelian Sukses !"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
