package com.prodemy.posspringbackend.controller;

import com.prodemy.posspringbackend.model.entity.Transaction;
import com.prodemy.posspringbackend.model.entity.TransactionDetail;
import com.prodemy.posspringbackend.model.request.CategoryRequest;
import com.prodemy.posspringbackend.model.request.TransactionRequest;
import com.prodemy.posspringbackend.model.response.ApiResponse;
import com.prodemy.posspringbackend.model.response.CategoryResponse;
import com.prodemy.posspringbackend.service.TransactionDetailService;
import com.prodemy.posspringbackend.service.TransactionService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/pos/api/transaction")
public class TransactionController {

    @Autowired
    TransactionService transactionService;

    @Autowired
    TransactionDetailService transactionDetailService;

    @GetMapping()
    public ResponseEntity<List<Transaction>> getAllTransactions(){
        List<Transaction> transactions = transactionService.getAllTransactions();

        return ResponseEntity.ok(transactions);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Transaction>  getTransaction(@PathVariable Integer id){
        try {
            Transaction transaction = transactionService.getTransaction(id);

            return ResponseEntity.ok(transaction);
        } catch (EntityNotFoundException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage(), e);
        }
    }

    @PostMapping()
    public ResponseEntity<ApiResponse> addTransaction(@Valid @RequestBody TransactionRequest transactionRequest) {

        transactionService.addTransaction(transactionRequest);

        ApiResponse response = new ApiResponse();

        response.setStatus("ok");
        response.setMessage("success");

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}/details")
    public ResponseEntity<List<TransactionDetail>>  getTransactionDetail(@PathVariable Integer id){
        try {
            List<TransactionDetail> transactionDetails = transactionDetailService.getTransactionDetail(id);

            return ResponseEntity.ok(transactionDetails);
        } catch (EntityNotFoundException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage(), e);
        }
    }

}
