package com.prodemy.posspringbackend.service;

import com.prodemy.posspringbackend.model.entity.Category;
import com.prodemy.posspringbackend.model.request.CategoryRequest;
import com.prodemy.posspringbackend.model.response.CategoryResponse;

import java.util.List;

public interface CategoryService {
    List<Category> getAllCategories();

    List<CategoryResponse> getAllCategoriesWithProductCount();

    CategoryResponse getAllCategoriesWithProductCountById(Integer categoryId);

    void addCategory(CategoryRequest categoryRequest);

    void deleteCategory(Integer categoryId);

    void updateCategory(CategoryRequest categoryRequest, Integer categoryId);
}
