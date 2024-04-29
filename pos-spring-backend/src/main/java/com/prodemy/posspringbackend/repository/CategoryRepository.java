package com.prodemy.posspringbackend.repository;

import com.prodemy.posspringbackend.model.entity.Category;
import com.prodemy.posspringbackend.model.response.CategoryResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {

    @Query("SELECT new com.prodemy.posspringbackend.model.response.CategoryResponse(c.id, c.name, count(p.id)) " +
            "FROM Category c " +
            "LEFT JOIN c.products p " +
            "GROUP BY c.id, c.name")
    List<CategoryResponse> findAllWithProductCount();

    @Query("SELECT new com.prodemy.posspringbackend.model.response.CategoryResponse(c.id, c.name, count(p.id)) " +
            "FROM Category c " +
            "LEFT JOIN c.products p " +
            "WHERE c.id = :categoryId " +
            "GROUP BY c.id, c.name")
    CategoryResponse findWithProductCountByCategoryId(@Param("categoryId") Integer categoryId);
}
