package com.prodemy.posspringbackend.repository;

import com.prodemy.posspringbackend.model.entity.Category;
import com.prodemy.posspringbackend.model.entity.Product;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    List<Product> findByCategory(Category category);
    List<Product> findByCategory(Category category, Sort sort);
    List<Product> findByTitleContaining(String keyword);
    List<Product> findByTitleContaining(String keyword, Sort sort);
    List<Product> findByTitleContainingAndCategory(String keyword, Category category);
    List<Product> findByTitleContainingAndCategory(String keyword, Category category, Sort sort);
}
