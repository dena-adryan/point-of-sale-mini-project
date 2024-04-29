/* eslint-disable no-unused-vars */
// import React from 'react';

import SelectedProduct from '../components/SelectedProduct';
import ProductCard from '../components/ProductCard';
import Header from '../layouts/Header';
import Category from '../components/Category';

import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import axios from 'axios';

export default function OrderPage() {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [sort_by, setSortBy] = useState('title');
    const [sort_order, setSortOrder] = useState('desc');
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [category_id, setCategory] = useState(null);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const handleSortChange = (event) => {
        setSortBy(event.target.value);
    };

    const handleSortOrderChange = (event) => {
        setSortOrder(sort_order === 'desc' ? 'asc' : 'desc');
    };

    const handleCategoryChange = (categoryId) => {
        setCategory(categoryId);
    };

    const handleSearch = () => {
        console.log(searchValue);
        setTitle(searchValue);
    };

    useEffect(() => {
        axios
            .get('http://localhost:8080/pos/api/category')
            .then((res) => {
                setCategories(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        axios
            .get('http://localhost:8080/pos/api/listproduct', {
                params: {
                    category_id,
                    title,
                    sort_by,
                    sort_order,
                },
            })
            .then((res) => {
                setProducts(res.data);
            })
            .catch((err) => console.log(err));
    }, [category_id, title, sort_by, sort_order]);

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch(searchValue);
        }
    };

    const handleAddToSelected = (product) => {
        if (
            !selectedProducts.some(
                (selectedProduct) => selectedProduct.id === product.id,
            )
        ) {
            setSelectedProducts([
                ...selectedProducts,
                { ...product, quantity: 1 },
            ]);
            setTotalPrice(totalPrice + product.price);
        }
    };

    const handleRemoveFromSelected = (productIdToRemove) => {
        const updatedSelectedProducts = selectedProducts.filter(
            (product) => product.id !== productIdToRemove,
        );

        setSelectedProducts(updatedSelectedProducts);
    };

    const calculateTotalPrice = (price) => {
        setTotalPrice(totalPrice + price);
    };

    const toPayment = () => {
        navigate('/payment', {
            state: {
                selectedProducts: JSON.stringify(selectedProducts),
                totalPrice: JSON.stringify(totalPrice),
            },
        });
    };

    const updateQuantity = (productId, newQuantity) => {
        setSelectedProducts((prevProducts) => {
            return prevProducts.map((product) => {
                if (product.id === productId) {
                    return { ...product, quantity: newQuantity };
                }
                return product;
            });
        });
    };

    return (
        <div className=" bg-yellow-100 h-full min-h-screen w-screen ">
            <div className="flex flex-col h-full p-8 w-3/4 mx-auto py-10">
                <Header />
                <div className=" basis-11/12 flex flex-row bg-orange-100 rounded-b-lg">
                    <div className="flex flex-col basis-8/12 bg-orange-300 m-4 rounded-3xl">
                        <div className=" m-4 bg-orange-300 basis-2/12 flex flex-row items-center ">
                            <div className=" m-4 bg-orange-300 basis-6/12">
                                <h1 className=" text-4xl font-bold text-orange-950">
                                    Daftar Produk
                                </h1>
                            </div>
                            <div className=" m-4 bg-orange-300 basis-6/12 flex flex-row items-center">
                                <div className="  basis-5/12 m-2 flex">
                                    <select
                                        value={sort_by}
                                        onChange={handleSortChange}
                                        className=" p-1 rounded-lg font-bold"
                                    >
                                        <option
                                            className=" font-bold"
                                            value="title"
                                        >
                                            Sort by Name
                                        </option>
                                        <option
                                            className=" font-bold"
                                            value="price"
                                        >
                                            Sort by Price
                                        </option>
                                    </select>
                                    <div onClick={handleSortOrderChange}>
                                        {sort_order === 'desc' ? (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    fill="#000"
                                                    fillRule="evenodd"
                                                    d="M6 19.5v-15h2v15H6Z"
                                                    clipRule="evenodd"
                                                />
                                                <path
                                                    fill="#000"
                                                    fillRule="evenodd"
                                                    d="m7 18.086-2.293-2.293-1.414 1.414 3 3a1 1 0 0 0 1.414 0l3-3-1.414-1.414L7 18.086zm7-5.586h-4v2h4v-2zm3-4h-7v2h7v-2zm3-4H10v2h10v-2z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        ) : (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    fill="#000"
                                                    fillRule="evenodd"
                                                    d="M6 19.5v-15h2v15H6Z"
                                                    clipRule="evenodd"
                                                />
                                                <path
                                                    fill="#000"
                                                    fillRule="evenodd"
                                                    d="m7 18.086-2.293-2.293-1.414 1.414 3 3a1 1 0 0 0 1.414 0l3-3-1.414-1.414L7 18.086zM14 6.5h-4v-2h4v2zm3 4h-7v-2h7v2zm3 4H10v-2h10v2z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        )}
                                    </div>
                                </div>
                                <div className=" bg-orange-300 basis-7/12 m-2 flex p-4">
                                    <input
                                        type="text"
                                        value={searchValue}
                                        onChange={(e) =>
                                            setSearchValue(e.target.value)
                                        }
                                        onKeyDown={handleKeyPress}
                                        placeholder={
                                            title === ''
                                                ? 'Cari Produk..'
                                                : title
                                        }
                                        className=" p-1 rounded-lg"
                                    />
                                    <button
                                        onClick={handleSearch}
                                        className=" "
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="icon icon-tabler icons-tabler-outline icon-tabler-search"
                                        >
                                            <path
                                                stroke="none"
                                                d="M0 0h24v24H0z"
                                                fill="none"
                                            />
                                            <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                                            <path d="M21 21l-6 -6" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className=" m-4 bg-orange-100 basis-8/12 grid grid-cols-3 gap-4 p-4">
                            {products.map((product) => {
                                return (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                        onAddToSelected={handleAddToSelected}
                                    />
                                );
                            })}
                        </div>
                        <div className=" m-4 bg-orange-300 basis-2/12 flex flex-row p-2">
                            <Category
                                categoryId={null}
                                categoryName="Semua"
                                onClick={handleCategoryChange}
                                selectedCategory={category_id}
                            />
                            {categories.map((category) => {
                                return (
                                    <Category
                                        key={category.id}
                                        categoryId={category.id}
                                        categoryName={category.name}
                                        onClick={handleCategoryChange}
                                        selectedCategory={category_id}
                                    />
                                );
                            })}
                        </div>
                    </div>
                    <div className=" basis-4/12 bg-orange-300 m-4 flex flex-col rounded-3xl">
                        <div className=" basis-9/12 bg-orange-300 m-4 flex flex-col p-2">
                            <div className=" flex items-center justify-center basis-1/5 bg-orange-300 m-2">
                                <h1 className=" text-4xl font-bold text-orange-950">
                                    Daftar Pesanan
                                </h1>
                            </div>
                            <div className=" basis-4/5 bg-orange-200 m-2 flex flex-col p-2">
                                <SelectedProduct
                                    selectedProducts={selectedProducts}
                                    onRemoveFromSelected={
                                        handleRemoveFromSelected
                                    }
                                    onPriceChange={calculateTotalPrice}
                                    onQuantityChange={updateQuantity}
                                />
                            </div>
                        </div>
                        <div className=" basis-3/12 bg-orange-300 m-4 flex flex-col">
                            <div className=" basis-1/3 bg-orange-300 m-2 flex justify-between p-2">
                                <h3 className=" text-orange-950 font-bold text-2xl">
                                    Total
                                </h3>
                                <h3 className="text-orange-950 font-bold text-2xl">
                                    Rp.{totalPrice}
                                </h3>
                            </div>
                            <div className=" min-h-16 m-10 rounded-lg basis-2/3  flex content-center justify-center ">
                                <button
                                    className=" text-white font-bold text-2xl h-full w-full hover:bg-green-600 bg-green-700 disabled:bg-green-900 rounded-lg"
                                    onClick={toPayment}
                                    disabled={totalPrice == 0}
                                >
                                    Bayar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
