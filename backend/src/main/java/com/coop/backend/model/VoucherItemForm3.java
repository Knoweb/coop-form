package com.coop.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class VoucherItemForm3 {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String itemDate;
    private String description;
    private String billNo;
    private Double amountRs;
    private Double amountCts;
}
