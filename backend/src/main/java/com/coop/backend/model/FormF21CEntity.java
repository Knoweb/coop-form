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
@Table(name = "form_f21c_stock_report_v2")
@NoArgsConstructor
public class FormF21CEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String reportDate;
    private String sectionCategory;
    private String rowName;
    private String refNo;

    private Double prevDayQty;
    private Double prevDayVal;

    private Double dailyQty;
    private Double dailyVal;

    private Double totalQty;
    private Double totalVal;

    private Double salesQty;
    private Double salesVal;

    private Double varianceQty;
    private Double varianceVal;

    private Double grandTotalVal;
}
