/* eslint-disable no-unused-vars */
// import React from 'react';

import ProductCard from '../components/ProductCard';
import Table from '../components/Table';
import Title from '../components/Title';
import Header from '../layouts/Header';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function TransactionHistoryPage() {
    const [transactions, setTransactions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get('http://localhost:8080/pos/api/transaction')
            .then((res) => {
                setTransactions(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    const handleGoToTransactionDetail = (id) => {
        navigate(`/transaction/${id}`);
    };

    return (
        <div className=" bg-yellow-100 h-screen">
            <div className="flex flex-col h-full w-3/4 mx-auto">
                <Header />
                <div className=" basis-11/12 flex flex-row bg-orange-200">
                    <div className="flex flex-col w-full bg-orange-200 m-4">
                        <div className=" m-4 bg-orange-200 basis-1/12 flex flex-row ">
                            <Title title="Riwayat Transaksi" />
                        </div>
                        <div className=" m-4 bg-orange-200 basis-11/12 p-4">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr>
                                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Tanggal Transaksi
                                        </th>
                                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            ID Transaksi
                                        </th>
                                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Total Harga
                                        </th>
                                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Total Bayar
                                        </th>
                                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {transactions.map((transaction) => {
                                        return (
                                            <tr key={transaction.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {transaction.transactionDate.substring(
                                                        0,
                                                        10,
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {transaction.id}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {transaction.totalAmount}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {transaction.totalPay}
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap grid grid-cols-3 gap-1">
                                                    <button
                                                        className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
                                                        onClick={() =>
                                                            handleGoToTransactionDetail(
                                                                transaction.id,
                                                            )
                                                        }
                                                    >
                                                        DETAIL TRANSAKSI
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
