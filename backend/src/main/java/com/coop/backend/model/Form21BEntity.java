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
@Table(name = "form_21b_branch_register")
@NoArgsConstructor
public class Form21BEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Header Metadata
    private String branchOrDepartmentName;
    private String bookAccountRef;

    // Main Entry
    private String date;
    private String billAndDescription;
    private String serialRangeFromTo;
    
    private Double quantity;
    private Double value;

    // Return Section
    private String returnDate;
    private String returnBalance;
    private String returnSerialRange;
    private String returnOfficerSignature;
}
