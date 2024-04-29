package com.prodemy.posspringbackend.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name="transactions")
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name="transaction_date")
    private Date transactionDate;
    @Column(name="total_amount")
    private Integer totalAmount;
    @Column(name="total_pay")
    private Integer totalPay;

    @JsonIgnore
    @OneToMany(mappedBy = "transaction")
    private List<TransactionDetail> transactionDetails;

}
