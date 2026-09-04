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
    private String billNo;

    private Double buyingPriceUnit;
    private Double buyingPriceTotal;

    private Double qtyIssued;
    private Double qtyReceived;

    private Double valueIssued;
    private Double valueReceived;

    private Double previousBalance;
    private Double dailyRequirement;
    private Double qtyBalance;

    private Double sellingPriceUnit;
    private Double sellingPriceTotal;

    private String handedOverRef;
    private String remarks;
}
