/* eslint-disable no-unused-vars */
// import React from 'react';

import Title from '../components/Title';
import Header from '../layouts/Header';
import DetailButton from '../components/buttons/DetailButton';
import EditButton from '../components/buttons/EditButton';
import DeleteButton from '../components/buttons/DeleteButton';
import AddButton from '../components/buttons/AddButton';
import ConfirmationPopupModal from '../components/ConfirmationPopupModal';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ProductListPage() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        axios
            .get('http://localhost:8080/pos/api/listproduct')
            .then((res) => {
                setProducts(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    const handleGoToProductDetail = (id) => {
        navigate(`/product/${id}`);
    };

    const handleGoToAddProductForm = () => {
        navigate(`/product/new`);
    };

    const handleGoToEditProductForm = (id) => {
        navigate(`/product/${id}/edit`);
    };

    const handleDeleteProduct = (id) => {
        axios
            .delete(`http://localhost:8080/pos/api/deleteproduct/${id}`)
            .then((res) => {
                if (res.status === 200) {
                    console.log('Product deleted successfully');
                    window.location.reload();
                } else {
                    throw new Error('Failed to delete product');
                }
            })
            .catch((err) => {
                console.error('Error deleting product:', err);
            });
    };

    const handleDeletion = (id) => {
        handleDeleteProduct(id);
        setIsModalOpen(false);
    };

    const handleCancelDeletion = () => {
        setIsModalOpen(false);
    };

    return (
        <div className=" bg-yellow-100 min-h-screen">
            <div className="flex flex-col h-full w-3/4 mx-auto">
                <Header />
                <div className=" basis-11/12 flex flex-row bg-orange-200">
                    <div className="flex flex-col w-full bg-orange-200 m-4">
                        <div className=" m-4 bg-orange-200 basis-1/12 flex flex-row items-center justify-between p-4">
                            <Title title="Daftar Produk" />
                            <AddButton
                                buttonName="+TAMBAH PRODUK"
                                onClick={() => handleGoToAddProductForm()}
                            />
                        </div>
                        <div className=" m-4 bg-orange-200 basis-11/12 p-4">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr>
                                        <th className="  px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            ID Produk
                                        </th>
                                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Nama Produk
                                        </th>
                                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Harga Satuan
                                        </th>
                                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Kategori
                                        </th>
                                        <th className=" px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {products.map((product) => {
                                        return (
                                            <tr key={product.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {product.id}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {product.title}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {product.price}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {product.category_name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap grid grid-cols-3 gap-1">
                                                    <DetailButton
                                                        onClick={() =>
                                                            handleGoToProductDetail(
                                                                product.id,
                                                            )
                                                        }
                                                    />
                                                    <EditButton
                                                        onClick={() =>
                                                            handleGoToEditProductForm(
                                                                product.id,
                                                            )
                                                        }
                                                    />
                                                    <DeleteButton
                                                        onClick={() =>
                                                            setIsModalOpen(true)
                                                        }
                                                    />
                                                    <ConfirmationPopupModal
                                                        isOpen={isModalOpen}
                                                        onYes={() =>
                                                            handleDeletion(
                                                                product.id,
                                                            )
                                                        }
                                                        onNo={() =>
                                                            handleCancelDeletion()
                                                        }
                                                        popupMessage="Apa anda yakin akan menghapus produk ini ?"
                                                    />
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
