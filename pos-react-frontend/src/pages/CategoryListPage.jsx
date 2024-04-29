/* eslint-disable no-unused-vars */
// import React from 'react';

import Table from '../components/Table';
import Title from '../components/Title';
import Header from '../layouts/Header';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import AddButton from '../components/buttons/AddButton';
import DetailButton from '../components/buttons/DetailButton';
import EditButton from '../components/buttons/EditButton';
import DeleteButton from '../components/buttons/DeleteButton';
import ConfirmationPopupModal from '../components/ConfirmationPopupModal';

export default function CategoryListPage() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        axios
            .get('http://localhost:8080/pos/api/category')
            .then((res) => {
                setCategories(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    const handleGoToCategoryDetail = (id) => {
        navigate(`/category/${id}`);
    };

    const handleDeleteCategory = (id) => {
        axios
            .delete(`http://localhost:8080/pos/api/category/${id}`)
            .then((res) => {
                if (res.status === 200) {
                    console.log('Category deleted successfully');
                    window.location.reload();
                } else {
                    throw new Error('Failed to delete category');
                }
            })
            .catch((err) => {
                console.error('Error deleting category:', err);
            });
    };

    const handleGoToAddCategoryForm = () => {
        navigate(`/category/new`);
    };

    const handleGoToEditCategoryForm = (id) => {
        navigate(`/category/${id}/edit`);
    };

    const handleDeletion = (id) => {
        handleDeleteCategory(id);
        setIsModalOpen(false);
    };

    const handleCancelDeletion = () => {
        setIsModalOpen(false);
    };

    return (
        <div className=" bg-yellow-100 h-screen">
            <div className="flex flex-col h-full w-3/4 mx-auto">
                <Header />
                <div className=" basis-11/12 flex flex-row bg-orange-200">
                    <div className="flex flex-col w-full bg-orange-200 m-4">
                        <div className=" m-4 bg-orange-200 basis-1/12 flex flex-row justify-between p-4">
                            <Title title="Daftar Kategori" />
                            <AddButton
                                buttonName="+TAMBAH KATEGORI"
                                onClick={() => handleGoToAddCategoryForm()}
                            />
                        </div>
                        <div className=" m-4 bg-orange-200 basis-11/12 p-4">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr>
                                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            ID Kategori
                                        </th>
                                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Nama Kategori
                                        </th>
                                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Jumlah Produk Terkait
                                        </th>
                                        <th className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {categories.map((category) => {
                                        return (
                                            <tr key={category.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {category.id}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {category.name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {category.product_count}
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap grid grid-cols-3 gap-1">
                                                    <DetailButton
                                                        onClick={() =>
                                                            handleGoToCategoryDetail(
                                                                category.id,
                                                            )
                                                        }
                                                    />
                                                    <EditButton
                                                        onClick={() =>
                                                            handleGoToEditCategoryForm(
                                                                category.id,
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
                                                                category.id,
                                                            )
                                                        }
                                                        onNo={() =>
                                                            handleCancelDeletion()
                                                        }
                                                        popupMessage="Apa anda yakin akan menghapus kategori ini ?"
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
