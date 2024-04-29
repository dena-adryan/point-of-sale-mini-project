/* eslint-disable no-unused-vars */
// import React from 'react';

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import {
    OrderPage,
    PaymentPage,
    TransactionHistoryPage,
    TransactionDetailPage,
    ProductListPage,
    ProductFormPage,
    ProductDetailPage,
    CategoryListPage,
    CategoryFormPage,
    CategoryDetailPage,
} from './pages';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<OrderPage />} />
                <Route path="/payment" element={<PaymentPage />} />

                <Route
                    path="/transaction"
                    element={<TransactionHistoryPage />}
                />
                <Route
                    path="/transaction/:id"
                    element={<TransactionDetailPage />}
                />

                <Route path="/product" element={<ProductListPage />} />
                <Route path="/product/new" element={<ProductFormPage />} />
                <Route path="/product/:id" element={<ProductDetailPage />} />
                <Route path="/product/:id/edit" element={<ProductFormPage />} />

                <Route path="/category" element={<CategoryListPage />} />
                <Route path="/category/new" element={<CategoryFormPage />} />
                <Route path="/category/:id" element={<CategoryDetailPage />} />
                <Route
                    path="/category/:id/edit"
                    element={<CategoryFormPage />}
                />
            </Routes>
        </BrowserRouter>
    );
}
