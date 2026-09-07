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
@Table(name = "form_16d_purchases")
@NoArgsConstructor
public class Form16DEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String date;
    private String storeType;
    private String transactionType;
    
    private String serialNo;
    private String storeKeeperName;
    private String billNo;
    
    private Double buyingPrice;
    private Double sellingPrice;
}
