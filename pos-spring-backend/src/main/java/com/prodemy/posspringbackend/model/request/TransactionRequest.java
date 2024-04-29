package com.prodemy.posspringbackend.model.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;
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
public class TransactionRequest {

    @JsonProperty("transaction_date")
    @NotNull(message = "Transaction Date is required")
    private Date transactionDate;

    @JsonProperty("total_amount")
    @NotNull(message = "Total Amount is required")
    private Integer totalAmount;

    @JsonProperty("total_pay")
    @NotNull(message = "Total Pay is required")
    private Integer totalPay;

    @JsonProperty("transaction_details")
    @NotNull(message = "Transaction Detail is required")
    private List<TransactionDetailRequest> transactionDetails;
}
