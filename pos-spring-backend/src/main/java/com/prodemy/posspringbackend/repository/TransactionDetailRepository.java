package com.prodemy.posspringbackend.repository;

import com.prodemy.posspringbackend.model.entity.Product;
import com.prodemy.posspringbackend.model.entity.Transaction;
import com.prodemy.posspringbackend.model.entity.TransactionDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionDetailRepository extends JpaRepository<TransactionDetail, Integer> {
    List<TransactionDetail> findByProduct(Product product);
    List<TransactionDetail> findByTransaction(Transaction transaction);
}
