package com.prodemy.posspringbackend.controller;

import com.prodemy.posspringbackend.model.request.ProductRequest;
import com.prodemy.posspringbackend.model.response.ApiResponse;
import com.prodemy.posspringbackend.model.response.ProductResponse;
import com.prodemy.posspringbackend.service.ProductService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/pos/api")
public class ProductController {
    @Autowired
    ProductService productService;

    @GetMapping("/listproduct")
    public ResponseEntity<List<ProductResponse>> getAllProducts(@RequestParam Optional<String> title, @RequestParam Optional<String> category_id, @RequestParam Optional<String> sort_by, @RequestParam Optional<String> sort_order){
        try {
            List<ProductResponse> products = productService.getAllProducts(title.orElse(null), category_id.orElse(null), sort_by.orElse(null), sort_order.orElse(null));

            return ResponseEntity.ok(products);

        }catch (EntityNotFoundException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage(), e);
        }
    }

    @GetMapping("/detailproduct/{id}")
    public ResponseEntity<ApiResponse>  getProductDetail(@PathVariable Integer id){
        try {
            ProductResponse product = productService.getProductById(id);

            ApiResponse response = new ApiResponse();
            response.setData(product);

            return ResponseEntity.ok(response);
        } catch (EntityNotFoundException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage(), e);
        }
    }

    @PostMapping("/addproduct")
    public ResponseEntity<ApiResponse> addProduct(@Valid @RequestBody ProductRequest productRequest) {

        try {
            productService.addProduct(productRequest);
        } catch (EntityNotFoundException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage(), e);
        }

        ApiResponse response = new ApiResponse();

        response.setStatus("ok");
        response.setMessage("success");

        return ResponseEntity.ok(response);
    }


    @PutMapping("/updateproduct/{id}")
    public ResponseEntity<ApiResponse> updateProduct(@RequestBody ProductRequest productRequest, @PathVariable Integer id){
        try {
            productService.updateProduct(productRequest, id);
        } catch (EntityNotFoundException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage(), e);
        }

        ApiResponse response = new ApiResponse();

        response.setStatus("ok");
        response.setMessage("success");

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/deleteproduct/{id}")
    public ResponseEntity<ApiResponse> deleteProduct(@PathVariable Integer id) {

        try {
            productService.deleteProduct(id);
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
