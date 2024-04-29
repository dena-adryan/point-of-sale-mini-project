/* eslint-disable no-unused-vars */
// import React from 'react';

import { useEffect, useState } from 'react';
import Title from '../components/Title';
import Header from '../layouts/Header';

import { useNavigate, useParams } from 'react-router-dom';

import axios from 'axios';
import ReturnButton from '../components/buttons/ReturnButton';

export default function CategoryDetailPage() {
    const { id } = useParams();
    const [category, setCategory] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`http://localhost:8080/pos/api/category/${id}`)
            .then((res) => {
                setCategory(res.data);
            })
            .catch((err) => console.log(err));
    }, [id]);

    const handleGoBack = () => {
        navigate('/category');
    };

    return (
        <div className=" bg-yellow-100 h-screen">
            <div className="flex flex-col h-full w-3/4 mx-auto">
                <Header />
                <div className=" basis-11/12 flex flex-row bg-orange-200">
                    <div className="flex flex-col w-full bg-orange-200 m-4">
                        <div className=" m-4 bg-orange-200 basis-2/12 flex flex-row justify-between p-4">
                            <Title title="Detail Kategori" />
                            <ReturnButton onClick={() => handleGoBack()} />
                        </div>
                        <div className=" m-4 bg-orange-100 basis-10/12 flex flex-row p-4">
                            <div className=" basis-3/4">
                                {category ? (
                                    <article>
                                        <dl className="grid grid-cols-2 gap-2 w-1/2 p-10">
                                            <dt className="font-semibold">
                                                ID Kategori
                                            </dt>
                                            <dd>{category.id}</dd>

                                            <dt className="font-semibold">
                                                Nama Kategori
                                            </dt>
                                            <dd>{category.name}</dd>

                                            <dt className="font-semibold">
                                                Jumlah Produk Terkait
                                            </dt>
                                            <dd>{category.product_count}</dd>
                                        </dl>
                                    </article>
                                ) : (
                                    <p>Loading...</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
