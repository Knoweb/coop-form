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
@Table(name = "form_20_analysis")
@NoArgsConstructor
public class Form20Entity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String date;
    private String storeName;
    
    private String buyerName;
    private String billNo;
    
    private String item1Name;
    private String item1Code;
    private Double item1UnitPrice;
    private Double item1Qty;
    private Double item1Freight;
    private Double item1Other;
    
    private String item2Name;
    private String item2Code;
    private Double item2UnitPrice;
    private Double item2Qty;
    private Double item2Freight;
    private Double item2Other;
    
    private String item3Name;
    private String item3Code;
    private Double item3UnitPrice;
    private Double item3Qty;
    private Double item3Freight;
    private Double item3Other;
    
    private String ledgerPage;
}
