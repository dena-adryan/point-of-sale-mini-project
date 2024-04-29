package com.prodemy.posspringbackend.service.impl;

import com.prodemy.posspringbackend.model.entity.Category;
import com.prodemy.posspringbackend.model.entity.Product;
import com.prodemy.posspringbackend.model.entity.Transaction;
import com.prodemy.posspringbackend.model.entity.TransactionDetail;
import com.prodemy.posspringbackend.model.request.TransactionRequest;
import com.prodemy.posspringbackend.repository.ProductRepository;
import com.prodemy.posspringbackend.repository.TransactionDetailRepository;
import com.prodemy.posspringbackend.repository.TransactionRepository;
import com.prodemy.posspringbackend.service.TransactionService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class TransactionServiceImpl implements TransactionService {

    @Autowired
    TransactionRepository transactionRepository;

    @Autowired
    TransactionDetailRepository transactionDetailRepository;

    @Autowired
    ProductRepository productRepository;

    @Override
    @Transactional(readOnly = true)
    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Transaction getTransaction(Integer transactionId) {
        Transaction transaction = transactionRepository.findById(transactionId)
                .orElseThrow(() -> new EntityNotFoundException("Transaction not found with id: " + transactionId));

        return transaction;
    }

    @Override
    public void addTransaction(TransactionRequest transactionRequest) {
        Transaction transaction = Transaction.builder()
                .transactionDate(transactionRequest.getTransactionDate())
                .totalAmount(transactionRequest.getTotalAmount())
                .totalPay(transactionRequest.getTotalPay())
                .build();

        Integer transactionId = transactionRepository.save(transaction).getId();

        transactionRequest.getTransactionDetails()
                .forEach(x -> transactionDetailRepository.save(TransactionDetail.builder()
                        .quantity(x.getQuantity())
                        .subtotal(x.getSubtotal())
                        .product(productRepository.findById(x.getProduct_id()).get())
                        .transaction(transactionRepository.findById(transactionId).get())
                        .build()));
    }






}
