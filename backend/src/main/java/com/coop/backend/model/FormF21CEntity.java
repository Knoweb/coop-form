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
@Table(name = "form_f21c_stock_report")
@NoArgsConstructor
public class FormF21CEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String reportDate;
    private String category;
    private String description;
    private String refNo;

    private String item1Name;
    private String item2Name;
    private String item3Name;
    private String item4Name;
    private String item5Name;

    private Double item1Qty;
    private Double item1Value;
    
    private Double item2Qty;
    private Double item2Value;
    
    private Double item3Qty;
    private Double item3Value;
    
    private Double item4Qty;
    private Double item4Value;
    
    private Double item5Qty;
    private Double item5Value;
    
    private Double grandTotalValue;
}
