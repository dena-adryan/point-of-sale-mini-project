package com.prodemy.posspringbackend.model.request;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TransactionDetailRequest {
    @NotNull(message = "Product ID is required")
    private Integer product_id;

    @NotNull(message = "Quantity is required")
    private Integer quantity;

    @NotNull(message = "Subtotal Amount is required")
    private Integer subtotal;
}
