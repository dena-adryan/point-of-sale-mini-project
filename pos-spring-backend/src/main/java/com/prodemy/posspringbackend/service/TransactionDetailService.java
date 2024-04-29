package com.prodemy.posspringbackend.service;

import com.prodemy.posspringbackend.model.entity.TransactionDetail;

import java.util.List;

public interface TransactionDetailService {
   List<TransactionDetail> getTransactionDetail(Integer transactionId);
}
