package com.prodemy.posspringbackend.service.impl;

import com.prodemy.posspringbackend.model.entity.Category;
import com.prodemy.posspringbackend.model.entity.Product;
import com.prodemy.posspringbackend.model.request.CategoryRequest;
import com.prodemy.posspringbackend.model.response.CategoryResponse;
import com.prodemy.posspringbackend.repository.CategoryRepository;
import com.prodemy.posspringbackend.repository.ProductRepository;
import com.prodemy.posspringbackend.service.CategoryService;
import jakarta.persistence.EntityNotFoundException;
import org.hibernate.action.internal.EntityActionVetoException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ProductRepository productRepository;

    @Override
    public void addCategory(CategoryRequest categoryRequest) {
        Category category = Category.builder()
                .name(categoryRequest.getName())
                .build();

        categoryRepository.save(category);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public List<CategoryResponse> getAllCategoriesWithProductCount() {
        return categoryRepository.findAllWithProductCount();
    }

    @Override
    @Transactional(readOnly = true)
    public CategoryResponse getAllCategoriesWithProductCountById(Integer categoryId) {
        categoryRepository.findById(categoryId)
                .orElseThrow(() -> new EntityNotFoundException("Category not found with id: " + categoryId));

        return categoryRepository.findWithProductCountByCategoryId(categoryId);
    }


    @Override
    public void deleteCategory(Integer categoryId) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new EntityNotFoundException("Category not found with id: " + categoryId));

        List<Product> products = productRepository.findByCategory(category);
        if(!products.isEmpty()){
            throw new IllegalStateException("Cannot delete category with id " + categoryId + " because it is associated with products");
        }

        categoryRepository.delete(category);
    }

    @Override
    public void updateCategory(CategoryRequest categoryRequest, Integer categoryId) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new EntityNotFoundException("Category not found with id: " + categoryId));

        category.setName(categoryRequest.getName());

        categoryRepository.save(category);
    }
}
