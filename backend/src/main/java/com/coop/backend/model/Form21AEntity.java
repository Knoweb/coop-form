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
@Table(name = "form_21a_stationery")
@NoArgsConstructor
public class Form21AEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double unitCost;
    private String itemType;
    private String bookNo;

    // Receipts
    private String recDate;
    private String recSealedBillNo;
    private String recBroughtBy;
    private String recInitials;
    private String recSerialFromTo;
    private Double recQty;
    private Double recValue;

    // Issues
    private String issDate;
    private String issReceiverRef;
    private String issBillSerialFromTo;
    private String issSignature;
    private Double issQty;
    private Double issValue;
    private Double issBalance;
}
