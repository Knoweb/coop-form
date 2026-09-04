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
@Table(name = "form_21_bin_card")
@NoArgsConstructor
public class Form21Entity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String itemName;
    private String headerDate;
    private Double headerPrice;
    
    private String dateLeft;
    private String refLeft;
    private Double inLeft;
    private Double outLeft;
    private Double balanceLeft;
    
    private String dateRight;
    private String refRight;
    private Double inRight;
    private Double outRight;
    private Double balanceRight;
}
