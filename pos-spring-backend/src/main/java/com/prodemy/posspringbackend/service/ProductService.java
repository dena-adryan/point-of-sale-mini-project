package com.prodemy.posspringbackend.service;

import com.prodemy.posspringbackend.model.request.ProductRequest;
import com.prodemy.posspringbackend.model.response.ProductResponse;

import java.util.List;

public interface ProductService {
    void addProduct(ProductRequest productRequest);
    List<ProductResponse> getAllProducts(String title, String categoryId, String sortBy, String sortOrder);
    void updateProduct(ProductRequest productRequest, Integer id);
    void deleteProduct(Integer id);
    ProductResponse getProductById(Integer id);
}
