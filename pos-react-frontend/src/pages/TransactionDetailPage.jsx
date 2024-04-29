/* eslint-disable no-unused-vars */
// import React from 'react';

import ProductCard from '../components/ProductCard';
import Table from '../components/Table';
import Title from '../components/Title';
import Header from '../layouts/Header';

import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function TransactionDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [transaction, setTransaction] = useState(null);
    const [transactionDetails, setTransactionDetails] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:8080/pos/api/transaction/${id}`)
            .then((res) => {
                setTransaction(res.data);
            })
            .catch((err) => console.log(err));
    }, [id]);

    useEffect(() => {
        axios
            .get(`http://localhost:8080/pos/api/transaction/${id}/details`)
            .then((res) => {
                setTransactionDetails(res.data);
            })
            .catch((err) => console.log(err));
    }, [id]);

    const handleGoBack = () => {
        navigate('/transaction');
    };

    return (
        <div className=" bg-yellow-100 h-screen">
            <div className="flex flex-col h-full w-3/4 mx-auto">
                <Header />
                <div className=" basis-11/12 flex flex-row bg-orange-200">
                    <div className="flex flex-col w-full bg-orange-200 m-4">
                        <div className=" m-4 bg-orange-200 basis-2/12 flex flex-row justify-between content-between p-4">
                            <Title title="Detail Transaksi" />
                            <button
                                className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                onClick={() => handleGoBack()}
                            >
                                KEMBALI
                            </button>
                        </div>
                        <div className=" m-4 bg-orange-100 basis-3/12 p-4">
                            {transaction ? (
                                <article>
                                    <dl className="grid grid-cols-2 gap-2 w-1/2">
                                        <dt className="font-semibold">
                                            ID Transaksi
                                        </dt>
                                        <dd>{transaction.id}</dd>

                                        <dt className="font-semibold">
                                            Tanggal Transaksi
                                        </dt>
                                        <dd>
                                            {transaction.transactionDate.substring(
                                                0,
                                                10,
                                            )}
                                        </dd>

                                        <dt className="font-semibold">
                                            Total Harga
                                        </dt>
                                        <dd>{transaction.totalAmount}</dd>

                                        <dt className="font-semibold">
                                            Total Bayar
                                        </dt>
                                        <dd>{transaction.totalPay}</dd>
                                    </dl>
                                </article>
                            ) : (
                                <p>Loading...</p>
                            )}
                        </div>
                        <div className=" m-4 bg-orange-200 basis-7/12 p-4">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr>
                                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            ID Produk
                                        </th>
                                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Nama Produk
                                        </th>
                                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Harga Satuan
                                        </th>
                                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Quantity
                                        </th>
                                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Subtotal
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {transactionDetails.map(
                                        (transactionDetail) => {
                                            return (
                                                <tr key={transactionDetail.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {
                                                            transactionDetail
                                                                .product.id
                                                        }
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {
                                                            transactionDetail
                                                                .product.title
                                                        }
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {
                                                            transactionDetail
                                                                .product.price
                                                        }
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {
                                                            transactionDetail.quantity
                                                        }
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {
                                                            transactionDetail.subtotal
                                                        }
                                                    </td>
                                                </tr>
                                            );
                                        },
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
