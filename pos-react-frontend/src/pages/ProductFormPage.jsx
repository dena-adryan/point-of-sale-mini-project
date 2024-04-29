/* eslint-disable no-unused-vars */
// import React from 'react';

import ProductCard from '../components/ProductCard';
import Table from '../components/Table';
import Title from '../components/Title';
import Header from '../layouts/Header';

import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

import ReturnButton from '../components/buttons/ReturnButton';
import PopupModal from '../components/PopupModal';

export default function ProductFormPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [categories, setCategories] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState('');
    const [product, setProduct] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        axios
            .get('http://localhost:8080/pos/api/category/list')
            .then((response) => {
                setCategories(response.data);
                if (response.data.length > 0 && id === undefined) {
                    setSelectedCategoryId(response.data[0].id);
                }
            })
            .catch((error) =>
                console.error('Error fetching categories:', error),
            );
    }, [id]);

    useEffect(() => {
        if (id !== null && id !== undefined) {
            axios
                .get(`http://localhost:8080/pos/api/detailproduct/${id}`)
                .then((response) => {
                    setProduct(response.data);
                    setSelectedCategoryId(response.data.category_id);
                })
                .catch((error) =>
                    console.error('Error fetching product:', error),
                );
        }
    }, [id]);

    const handleGoBack = () => {
        navigate('/product');
    };

    const handleAddProduct = () => {
        const title = document.getElementById('productName').value;
        const image = document.getElementById('productImage').value;
        const price = document.getElementById('productPrice').value;
        const category_id = selectedCategoryId;

        const newProductData = {
            title,
            image,
            price,
            category_id,
        };

        axios
            .post('http://localhost:8080/pos/api/addproduct', newProductData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => {
                if (response.status === 200) {
                    console.log('Product added successfully');
                    setIsModalOpen(true);
                } else {
                    throw new Error('Failed to add product');
                }
            })
            .catch((error) => {
                console.error('Error adding product:', error);
            });
    };

    const handleUpdateProduct = () => {
        const title = document.getElementById('productName').value;
        const image = document.getElementById('productImage').value;
        const price = document.getElementById('productPrice').value;
        const category_id = selectedCategoryId;

        const updatedProductData = {
            title,
            image,
            price,
            category_id,
        };

        axios
            .put(
                `http://localhost:8080/pos/api/updateproduct/${id}`,
                updatedProductData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            )
            .then((response) => {
                if (response.status === 200) {
                    console.log('Product updated successfully');
                    setIsModalOpen(true);
                } else {
                    throw new Error('Failed to update product');
                }
            })
            .catch((error) => {
                console.error('Error updating product:', error);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (id) {
            handleUpdateProduct();
        } else {
            handleAddProduct();
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        navigate('/product');
    };

    return (
        <div className=" bg-yellow-100 min-h-screen ">
            <div className="flex flex-col h-full w-3/4 mx-auto">
                <Header />
                <div className=" basis-11/12 flex flex-row bg-orange-200">
                    <div className="flex flex-col w-full bg-orange-200 m-4">
                        <div className=" m-4 bg-orange-200 basis-2/12 flex flex-row justify-between p-4">
                            <Title title="Form Produk" />
                            <ReturnButton onClick={() => handleGoBack()} />
                        </div>
                        <div className=" m-4 bg-orange-100 basis-10/12 flex p-4">
                            <form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 gap-4">
                                    <label
                                        className=" font-semibold"
                                        htmlFor="product-name"
                                    >
                                        Nama Produk
                                    </label>
                                    <input
                                        type="text"
                                        id="productName"
                                        name="product-name"
                                        required
                                        defaultValue={product.title}
                                    />

                                    <label
                                        className=" font-semibold"
                                        htmlFor="category"
                                    >
                                        Kategori
                                    </label>
                                    <select
                                        id="categories"
                                        name="category"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        value={selectedCategoryId}
                                        onChange={(event) =>
                                            setSelectedCategoryId(
                                                event.target.value,
                                            )
                                        }
                                    >
                                        {categories.map((category) => (
                                            <option
                                                key={category.id}
                                                value={category.id}
                                            >
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>

                                    <label
                                        className=" font-semibold"
                                        htmlFor="image-url"
                                    >
                                        URL Gambar
                                    </label>
                                    <input
                                        type="url"
                                        id="productImage"
                                        name="image-url"
                                        required
                                        defaultValue={product.image}
                                    />

                                    <label
                                        className=" font-semibold"
                                        htmlFor="price"
                                    >
                                        Harga Satuan
                                    </label>
                                    <input
                                        type="number"
                                        id="productPrice"
                                        name="price"
                                        required
                                        defaultValue={product.price}
                                    />

                                    <button
                                        className=" h-16 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                                        type="submit"
                                    >
                                        {id ? 'Update Product' : 'Add Product'}
                                    </button>

                                    <PopupModal
                                        isOpen={isModalOpen}
                                        onClose={handleCloseModal}
                                        popupMessage={`Produk berhasil ${id ? 'diperbarui' : 'ditambahkan'} !`}
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
