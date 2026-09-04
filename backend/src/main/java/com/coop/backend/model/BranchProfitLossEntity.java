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
@Table(name = "branch_profit_loss")
@NoArgsConstructor
public class BranchProfitLossEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String branchName;
    private String voucherNo;
    
    private Double income1;
    private Double income2;
    private Double income3;
    private Double income4;
    private Double totalIncome;
    
    private Double expense1;
    private Double expense2;
    private Double expense3;
    private Double expense4;
    private Double expense5;
    private Double expense6;
    private Double expense7;
    private Double expense8;
    private Double totalExpense;
    
    private Double netProfit;
}
