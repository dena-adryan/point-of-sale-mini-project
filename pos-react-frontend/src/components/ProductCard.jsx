/* eslint-disable react/prop-types */
// import React from 'react';

export default function ProductCard({ product, onAddToSelected }) {
    const handleClick = () => {
        onAddToSelected(product);
    };

    return (
        <div
            onClick={handleClick}
            className=" flex flex-col  max-w-sm p-6  border  rounded-lg shadow  bg-white border-stone-100 hover:bg-stone-100"
        >
            <div className=" basis-3/4">
                <img
                    className=" h-full w-auto rounded-lg border border-orange-200"
                    src={product.image}
                    alt={product.title}
                />
            </div>
            <div className=" basis-1/4">
                <h3 className="mb-2 text-xl font-bold tracking-tight text-orange-950 ">
                    {product.title}
                </h3>
                <p className="font-bold text-orange-400 ">
                    Rp. {product.price}
                </p>
            </div>
        </div>
    );
}
