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
@Table(name = "store_transfer_log")
@NoArgsConstructor
public class StoreTransferEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fromStore;
    private String toStore;
    
    private String serialNo;
    private String description;
    
    private Double quantity;
    
    private Double handoverCostUnit;
    private Double handoverCostTotal;
    private Double handoverSellingUnit;
    private Double handoverSellingTotal;
    
    private String receiverName;
    
    private Double receivingCostUnit;
    private Double receivingCostTotal;
    private Double receivingSellingUnit;
    private Double receivingSellingTotal;
    
    private String settlementNo;
    private String transferPage;
}
