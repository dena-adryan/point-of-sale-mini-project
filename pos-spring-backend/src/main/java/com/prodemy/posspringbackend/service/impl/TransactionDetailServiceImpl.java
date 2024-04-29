package com.prodemy.posspringbackend.service.impl;

import com.prodemy.posspringbackend.model.entity.TransactionDetail;
import com.prodemy.posspringbackend.repository.TransactionDetailRepository;
import com.prodemy.posspringbackend.repository.TransactionRepository;
import com.prodemy.posspringbackend.service.TransactionDetailService;
import jakarta.validation.constraints.Null;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class TransactionDetailServiceImpl implements TransactionDetailService {

    @Autowired
    TransactionDetailRepository transactionDetailRepository;

    @Autowired
    TransactionRepository transactionRepository;


    @Override
    public List<TransactionDetail> getTransactionDetail(Integer transactionId) {
        return transactionDetailRepository.findByTransaction(transactionRepository.findById(transactionId).orElse(null));
    }
}
