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
@Table(name = "form_16a_ledger")
@NoArgsConstructor
public class Form16AEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String date;
    private String itemDescription;
    private String referenceNo;

    private Double qtyReceived;
    private Double qtyIssued;
    private Double qtyBalance;

    private Double unitPrice;
    private Double valueReceived;
    private Double valueIssued;
    private Double valueBalance;

    private String remarks;
    private String signature;
}
