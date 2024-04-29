package com.prodemy.posspringbackend.model.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductResponse {
    private Integer id;
    private String title;
    private String image;
    private Integer price;
    private Integer category_id;
    private String category_name;
}
