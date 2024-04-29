package com.prodemy.posspringbackend.service;

import com.prodemy.posspringbackend.model.entity.Transaction;
import com.prodemy.posspringbackend.model.request.CategoryRequest;
import com.prodemy.posspringbackend.model.request.TransactionRequest;

import java.util.List;

public interface TransactionService {
    List<Transaction> getAllTransactions();
    Transaction getTransaction(Integer transactionId);

    void addTransaction(TransactionRequest transactionRequest);



}
