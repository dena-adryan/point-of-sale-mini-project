package com.prodemy.posspringbackend.model.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductRequest {
    @NotNull(message = "Category ID is required")
    private Integer category_id;

    @NotBlank(message = "Title is required")
    private String title;

    @NotNull(message = "Price is required")
    private Integer price;

    @NotBlank(message = "Image is required")
    private String image;




}
