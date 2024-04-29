/* eslint-disable no-unused-vars */
// import React from 'react';

import ProductCard from '../components/ProductCard';
import Table from '../components/Table';
import Title from '../components/Title';
import Header from '../layouts/Header';

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import axios from 'axios';
import ReturnButton from '../components/buttons/ReturnButton';

export default function ProductDetailPage() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`http://localhost:8080/pos/api/detailproduct/${id}`)
            .then((res) => {
                setProduct(res.data);
            })
            .catch((err) => console.log(err));
    }, [id]);

    const handleGoBack = () => {
        navigate('/product');
    };

    return (
        <div className=" bg-yellow-100 h-screen">
            <div className="flex flex-col h-full w-3/4 mx-auto">
                <Header />

                <div className=" basis-11/12 flex flex-row bg-orange-200">
                    <div className="flex flex-col w-full bg-orange-200 m-4">
                        <div className=" m-4 bg-orange-200 basis-2/12 flex flex-row justify-between p-4">
                            <Title title="Detail Produk" />
                            <ReturnButton onClick={() => handleGoBack()} />
                        </div>
                        <div className=" m-4 bg-orange-100 basis-10/12 flex flex-row items-start p-4">
                            <div className=" p-16 basis-3/4">
                                {product ? (
                                    <article className=" text-orange-950">
                                        <dl className="grid grid-cols-2 gap-2 w-1/3">
                                            <dt className="font-semibold">
                                                ID Produk
                                            </dt>
                                            <dd>{product.id}</dd>

                                            <dt className="font-semibold">
                                                Nama Produk
                                            </dt>
                                            <dd>{product.title}</dd>

                                            <dt className="font-semibold">
                                                Harga Satuan
                                            </dt>
                                            <dd>{product.price}</dd>

                                            <dt className="font-semibold">
                                                URL Gambar
                                            </dt>
                                            <dd>{product.image}</dd>

                                            <dt className="font-semibold">
                                                ID Kategori
                                            </dt>
                                            <dd>{product.category_id}</dd>

                                            <dt className="font-semibold">
                                                Nama Kategori
                                            </dt>
                                            <dd>{product.category_name}</dd>
                                        </dl>
                                    </article>
                                ) : (
                                    <p>Loading...</p>
                                )}
                            </div>
                            <div className=" basis-2/4 bg-orange-100 p-16">
                                <img
                                    src={product ? product.image : ''}
                                    alt="gambar_produk"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
