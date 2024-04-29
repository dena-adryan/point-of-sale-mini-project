/* eslint-disable react/prop-types */
// import React from 'react';

import SelectedProductCard from './SelectedProductCard';

export default function SelectedProduct({
    selectedProducts,
    onRemoveFromSelected,
    onPriceChange,
    onQuantityChange,
}) {
    return (
        <div className=" basis-2/12 bg-orange-200 p-2">
            <ul>
                {selectedProducts.map((product, index) => (
                    <li key={index}>
                        <SelectedProductCard
                            product={product}
                            onRemoveFromSelected={onRemoveFromSelected}
                            onPriceChange={onPriceChange}
                            onQuantityChange={onQuantityChange}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}
