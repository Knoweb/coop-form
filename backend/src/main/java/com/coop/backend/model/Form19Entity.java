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
@Table(name = "form_19_returns")
@NoArgsConstructor
public class Form19Entity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fromStore;
    private String toStore;
    private String transactionType;
    private String date;
    
    private String serialNo;
    private String receivedDateRef;
    private String description;
    
    private Double quantity;
    
    private Double costPriceUnit;
    private Double costPriceTotal;
    
    private Double sellingPriceUnit;
    private Double sellingPriceTotal;
    
    private String transferNo;
    private String pageNoted;
}
