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
@Table(name = "form_32a_summary")
@NoArgsConstructor
public class Form32AEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String serialNo;
    private String recordCategory;
    private String ref1;
    private String ref2;
    private Double val1;
    private Double val2;
    private Double val3;
    private Double val4;
    private Double val5;
    private Double val6;
    private Double val7;
    private Double val8;
    private Double val9;
    private Double val10;
    private Double total;
    private String remarks;
}
