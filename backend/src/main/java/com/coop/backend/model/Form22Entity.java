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
@Table(name = "form_22_stock_taking")
@NoArgsConstructor
public class Form22Entity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Header Metadata
    private String branchOrStore;
    private String date;
    private String oldLedgerRef;
    private String newLedgerRef;
    private String startingBillNo;

    // Row Data
    private String serialNo;
    private String itemCode;
    private String description;

    private Double ledgerBalance;
    private Double countedQtyPhysical;
    private Double differenceQty;

    private Double unitPrice;
    
    private Double excessValue;
    private Double shortageValue;

    private String remarks;
}
