package com.coop.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "form_16b_receipt")
@NoArgsConstructor
public class Form16BEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String date;
    private String retailStore;
    
    private String serialNo;
    private String description;
    private String returnableEmpties;
    
    private Double quantity;
    
    private Double wholesalePriceUnit;
    private Double wholesalePriceTotal;
    
    private Double retailPriceUnit;
    private Double retailPriceTotal;
    
    private String remarks;
}
