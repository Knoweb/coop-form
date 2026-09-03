package com.coop.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Data
@Table(name = "form_1")
public class PettyCashRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate date;
    
    private String name;

    private String description;

    private String voucherNo;

    private Double amountReceived;

    private Double amountPaid;

    private String ledgerFolio;

    // Analysis of payments
    private Double transport;
    private Double stationery;
    private Double postage;
    private Double meals;
    private Double other;
}
