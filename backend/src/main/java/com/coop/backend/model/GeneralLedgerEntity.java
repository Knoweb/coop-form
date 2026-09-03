package com.coop.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "general_ledger_form")
public class GeneralLedgerEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Receipts Side
    private String date;
    private String descriptionReceipts;
    private String voucherNoReceipts;
    private Double receiptsAmount;

    // Payments Side
    private String descriptionPayments;
    private String voucherNoPayments;
    private String folio;
    private Double paymentsAmount;
}
