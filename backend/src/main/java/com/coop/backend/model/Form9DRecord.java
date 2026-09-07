package com.coop.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Data
@Table(name = "form_9d")
public class Form9DRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate date;
    private String societyName;
    private String branchName;
    private String formNumber;

    private String memberNo;
    private String name;
    private String receiptNo;

    private Double shares;
    private Double loan;
    private Double interest;
    private Double deposits;
    private Double other;
    private Double totalAmount;
    
    private String ledgerFolio;
}
