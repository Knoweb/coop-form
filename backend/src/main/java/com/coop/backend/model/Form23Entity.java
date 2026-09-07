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
@Table(name = "form_23_financial_stock")
@NoArgsConstructor
public class Form23Entity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Header Metadata
    private String storeName;
    private String reportDate;

    // Item Row Details
    private String serialNo;
    private String itemCode;
    private String itemDescription;

    // Balances & Valuation
    private Double closingBalanceQty;
    private Double unitPrice;
    private Double stockTotalValue;
    
    private Double approvedQty;
    private Double writtenOffValue;

    // Remarks
    private String remarks;
}
