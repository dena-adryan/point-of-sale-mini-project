/* eslint-disable no-unused-vars */
// import React from 'react';

import Title from '../components/Title';
import Header from '../layouts/Header';

import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import axios from 'axios';
import ReturnButton from '../components/buttons/ReturnButton';
import PopupModal from '../components/PopupModal';

export default function CategoryFormPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [category, setCategory] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (id !== undefined) {
            axios
                .get(`http://localhost:8080/pos/api/category/${id}`)
                .then((response) => {
                    setCategory(response.data);
                })
                .catch((error) =>
                    console.error('Error fetching category:', error),
                );
        }
    }, [id]);

    const handleAddCategory = () => {
        const name = document.getElementById('categoryName').value;

        const newCategoryData = {
            name: name,
        };

        axios
            .post('http://localhost:8080/pos/api/category', newCategoryData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => {
                if (response.status === 200) {
                    console.log('Category added successfully');
                    setIsModalOpen(true);
                } else {
                    throw new Error('Failed to add category');
                }
            })
            .catch((error) => {
                console.error('Error adding category:', error);
            });
    };

    const handleUpdateCategory = () => {
        const name = document.getElementById('categoryName').value;

        const updatedCategoryData = {
            name: name,
        };

        axios
            .put(
                `http://localhost:8080/pos/api/category/${id}`,
                updatedCategoryData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            )
            .then((response) => {
                if (response.status === 200) {
                    console.log('Category updated successfully');
                    setIsModalOpen(true);
                } else {
                    throw new Error('Failed to update category');
                }
            })
            .catch((error) => {
                console.error('Error updating category:', error);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (id) {
            handleUpdateCategory();
        } else {
            handleAddCategory();
        }
    };

    const handleGoBack = () => {
        navigate('/category');
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        navigate('/category');
    };

    return (
        <div className=" bg-yellow-100 h-screen">
            <div className="flex flex-col h-full w-3/4 mx-auto">
                <Header />
                <div className=" basis-11/12 flex flex-row bg-orange-200">
                    <div className="flex flex-col w-full bg-orange-200 m-4">
                        <div className=" m-4 bg-orange-200 basis-2/12 flex flex-row justify-between p-4">
                            <Title title="Form Kategori" />
                            <ReturnButton onClick={() => handleGoBack()} />
                        </div>
                        <div className=" m-4 bg-orange-100 basis-10/12 flex p-4">
                            <form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 gap-4">
                                    <label
                                        className=" font-semibold"
                                        htmlFor="category-name"
                                    >
                                        Nama Category
                                    </label>
                                    <input
                                        type="text"
                                        id="categoryName"
                                        name="category-name"
                                        defaultValue={category.name}
                                        required
                                    />

                                    <button
                                        className=" h-16 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                                        type="submit"
                                    >
                                        {id
                                            ? 'Update Category'
                                            : 'Add Category'}
                                    </button>

                                    <PopupModal
                                        isOpen={isModalOpen}
                                        onClose={handleCloseModal}
                                        popupMessage={`Kategori berhasil ${id ? 'diperbarui' : 'ditambahkan'} !`}
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
