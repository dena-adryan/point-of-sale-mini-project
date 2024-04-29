package com.prodemy.posspringbackend.controller;

import com.prodemy.posspringbackend.model.entity.Category;
import com.prodemy.posspringbackend.model.request.CategoryRequest;
import com.prodemy.posspringbackend.model.request.ProductRequest;
import com.prodemy.posspringbackend.model.response.ApiResponse;
import com.prodemy.posspringbackend.model.response.CategoryResponse;
import com.prodemy.posspringbackend.model.response.ProductResponse;
import com.prodemy.posspringbackend.service.CategoryService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/pos/api/category")
public class CategoryController {

    @Autowired
    CategoryService categoryService;

    @GetMapping("/list")
    public ResponseEntity<List<Category>> getAllCategory(){
        List<Category> categories = categoryService.getAllCategories();

        return ResponseEntity.ok(categories);
    }

    @GetMapping()
    public ResponseEntity<List<CategoryResponse>> getAllCategories(){
         List<CategoryResponse> categories = categoryService.getAllCategoriesWithProductCount();

         return ResponseEntity.ok(categories);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CategoryResponse>  getCategoryDetail(@PathVariable Integer id){
        try {
            CategoryResponse category = categoryService.getAllCategoriesWithProductCountById(id);

            return ResponseEntity.ok(category);
        } catch (EntityNotFoundException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage(), e);
        }
    }

    @PostMapping()
    public ResponseEntity<ApiResponse> addCategory(@Valid @RequestBody CategoryRequest categoryRequest) {

        categoryService.addCategory(categoryRequest);

        ApiResponse response = new ApiResponse();

        response.setStatus("ok");
        response.setMessage("success");

        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> updateCategory(@RequestBody CategoryRequest categoryRequest, @PathVariable Integer id){
        try {
            categoryService.updateCategory(categoryRequest, id);
        } catch (EntityNotFoundException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage(), e);
        }

        ApiResponse response = new ApiResponse();

        response.setStatus("ok");
        response.setMessage("success");

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteCategory(@PathVariable Integer id) {

        try {
            categoryService.deleteCategory(id);
        } catch (EntityNotFoundException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage(), e);
        } catch(IllegalStateException e){
            throw new ResponseStatusException(HttpStatus.CONFLICT, e.getMessage(), e);
        }

        ApiResponse response = new ApiResponse();

        response.setStatus("ok");
        response.setMessage("success");

        return ResponseEntity.ok(response);
    }







}
