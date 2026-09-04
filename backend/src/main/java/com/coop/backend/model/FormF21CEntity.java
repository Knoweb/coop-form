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
    private String rowCategory;
    private String rowDescription;
    private String refNo;

    private String item1Name;
    private Double item1Qty;
    private Double item1Value;

    private String item2Name;
    private Double item2Qty;
    private Double item2Value;

    private String item3Name;
    private Double item3Qty;
    private Double item3Value;

    private String item4Name;
    private Double item4Qty;
    private Double item4Value;

    private String item5Name;
    private Double item5Qty;
    private Double item5Value;

    private Double grandTotalValue;
}
