package com.prodemy.posspringbackend.service.impl;

import com.prodemy.posspringbackend.model.entity.Category;
import com.prodemy.posspringbackend.model.entity.Product;
import com.prodemy.posspringbackend.model.entity.TransactionDetail;
import com.prodemy.posspringbackend.model.request.ProductRequest;
import com.prodemy.posspringbackend.model.response.ProductResponse;
import com.prodemy.posspringbackend.repository.CategoryRepository;
import com.prodemy.posspringbackend.repository.ProductRepository;
import com.prodemy.posspringbackend.repository.TransactionDetailRepository;
import com.prodemy.posspringbackend.service.ProductService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private TransactionDetailRepository transactionDetailRepository;

    @Override
    @SuppressWarnings("ConstantConditions")
    public void addProduct(ProductRequest productRequest) {
        Category category = categoryRepository.findById(productRequest.getCategory_id()).orElse(null);
        if (category == null) {
            throw new EntityNotFoundException("Category not found with ID: " + productRequest.getCategory_id());
        }


        Product product = Product.builder()
                .category(category)
                .title(productRequest.getTitle())
                .price(productRequest.getPrice())
                .image(productRequest.getImage())
                .build();

        productRepository.save(product);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductResponse> getAllProducts(String title, String categoryId, String sortBy, String sortOrder) {
        List<ProductResponse> productResponses = new ArrayList<>();
        List<Product> products = new ArrayList<>();

        if(title==null){
            if(categoryId==null){
                if(sortBy==null){
                    products = productRepository.findAll();
                }else if(sortBy.equalsIgnoreCase("title") || sortBy.equalsIgnoreCase("price")){
                    if(sortOrder.equalsIgnoreCase("desc")){
                        products = productRepository.findAll(Sort.by(Sort.Direction.DESC, sortBy));
                    }else{
                        //default sort dir is ASC
                        products = productRepository.findAll(Sort.by(sortBy));
                    }
                }
            }else{
                Category category = categoryRepository.findById(Integer.parseInt(categoryId)).orElseThrow(
                        () -> new EntityNotFoundException("Category not found with id: " + categoryId));
                if(sortBy==null){
                    products = productRepository.findByCategory(category);
                }else if(sortBy.equalsIgnoreCase("title") || sortBy.equalsIgnoreCase("price")){
                    if(sortOrder==null ||  sortOrder.equalsIgnoreCase("asc")){
                        //default sort direction is ASC
                        products = productRepository.findByCategory(category, Sort.by(sortBy));
                    }else if(sortOrder.equalsIgnoreCase("desc")){
                        products = productRepository.findByCategory(category, Sort.by(Sort.Direction.DESC, sortBy));

                    }
                }
            }
        }else{
            if(categoryId==null){
                if(sortBy==null){
                    products = productRepository.findByTitleContaining(title);
                }else if(sortBy.equalsIgnoreCase("title") || sortBy.equalsIgnoreCase("price")){
                    if(sortOrder==null || sortOrder.equalsIgnoreCase("asc")){
                        //default sort direction is ASC
                        products = productRepository.findByTitleContaining(title, Sort.by(sortBy));
                    }else if(sortOrder.equalsIgnoreCase("desc")){
                        products = productRepository.findByTitleContaining(title,Sort.by(Sort.Direction.DESC, sortBy));
                    }
                }
            }else{
                Category category = categoryRepository.findById(Integer.parseInt(categoryId)).orElseThrow(
                        () -> new EntityNotFoundException("Category not found with id: " + categoryId));
                if(sortBy==null){
                    products = productRepository.findByTitleContainingAndCategory(title, category);
                }else if(sortBy.equalsIgnoreCase("title") || sortBy.equalsIgnoreCase("price")){
                    if(sortOrder == null || sortOrder.equalsIgnoreCase("asc")){
                        //default sort direction is ASC
                        products = productRepository.findByTitleContainingAndCategory(title, category, Sort.by(sortBy));
                    }else if(sortOrder.equalsIgnoreCase("desc")){
                        products = productRepository.findByTitleContainingAndCategory(title, category, Sort.by(Sort.Direction.DESC, sortBy));
                    }
                }
            }
        }


        for (Product product : products) {
            ProductResponse productResponse = ProductResponse.builder()
                    .id(product.getId())
                    .title(product.getTitle())
                    .image(product.getImage())
                    .price(product.getPrice())
                    .category_id(product.getCategory().getId())
                    .category_name(product.getCategory().getName())
                    .build();

            productResponses.add(productResponse);
        }

        return productResponses;
    }

    @Override
    public void updateProduct(ProductRequest productRequest, Integer productId) {

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new EntityNotFoundException("Product not found with id: " + productId));

        product.setCategory(categoryRepository.getReferenceById(productRequest.getCategory_id()));
        product.setTitle(productRequest.getTitle());
        product.setPrice(productRequest.getPrice());
        product.setImage(productRequest.getImage());

        productRepository.save(product);
    }

    @Override
    public void deleteProduct(Integer productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new EntityNotFoundException("Product not found with id: " + productId));

        List<TransactionDetail> transactionDetails = transactionDetailRepository.findByProduct(product);
        if (!transactionDetails.isEmpty()) {
            throw new IllegalStateException("Cannot delete product with id " + productId + " because it is associated with transactions");
        }

        productRepository.delete(product);
    }

    @Override
    @Transactional(readOnly = true)
    public ProductResponse getProductById(Integer productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new EntityNotFoundException("Product not found with id: " + productId));

        ProductResponse productResponse = ProductResponse.builder()
                .id(productId)
                .title(product.getTitle())
                .image(product.getImage())
                .price(product.getPrice())
                .category_id(product.getCategory().getId())
                .category_name(product.getCategory().getName())
                .build();

        return productResponse;
    }
}
