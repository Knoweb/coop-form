package com.coop.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "multi_column_ledger")
public class MultiColumnLedgerEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String date;
    private String description;
    private String referenceNo;

    private Double cat1;
    private Double cat2;
    private Double cat3;
    private Double cat4;
    private Double cat5;
    private Double cat6;
    private Double cat7;
    private Double cat8;

    private Double total;
}
