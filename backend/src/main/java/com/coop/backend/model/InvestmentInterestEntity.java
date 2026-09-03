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
@Table(name = "investment_interest_journal")
public class InvestmentInterestEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String sectionNo;
    private String natureOfInvestment;

    private Double amountInvested;
    private Double rateOfInt;
    private Double annualEstimate;

    private Double jan;
    private Double feb;
    private Double mar;
    private Double apr;
    private Double may;
    private Double jun;
    private Double jul;
    private Double aug;
    private Double sep;
    private Double oct;
    private Double nov;
    private Double dec;

    private Double total;
}
