package com.coop.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "form_9e_items")
public class Form9EItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String side; // "RECEIPT" or "PAYMENT"
    private String description;
    
    private Double broughtForwardTransfers;
    private Double broughtForwardCash;
    
    private String folio;
    private String itemDate;
    private String refNo; // Receipt No or Voucher No
    
    private Double todayTransfers;
    private Double todayCash;
    
    private Double totalTransfers;
    private Double totalCash;
}
