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
@Table(name = "form_17_spoilage")
@NoArgsConstructor
public class Form17Entity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String date;
    private String storeType;
    
    private String serialNo;
    private String billNo;
    private String itemDescription;
    
    private Double quantity;
    private Double unitPrice;
    private Double reducedPrice;
    private Double increasedPrice;
    
    private Double valueLess;
    private Double valueMore;
    
    private Double spoilageDeduction;
    private Double priceChangeLoss;
    private Double priceChangeProfit;
    
    private String inspectorSignature;
    private String managerSignature;
}
