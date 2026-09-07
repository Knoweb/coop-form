package com.coop.backend.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "form_32_records")
public class Form32Record {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate date;
    
    @Column(length = 20)
    private String category; // WHOLESALE or RETAIL

    private String branchName;

    // Debit side
    private BigDecimal openingStock;
    private BigDecimal purchases;
    private BigDecimal transport;
    private BigDecimal rent;
    private BigDecimal traveling;
    private BigDecimal customDb1;
    private BigDecimal customDb2;
    private BigDecimal customDb3;
    private BigDecimal grossProfit;
    private BigDecimal totalDebit;

    // Credit side
    private BigDecimal salesCash;
    private BigDecimal salesCredit;
    private BigDecimal transfers;
    private BigDecimal transportIncome;
    private BigDecimal rentIncome;
    private BigDecimal customCr1;
    private BigDecimal customCr2;
    private BigDecimal customCr3;
    private BigDecimal closingStock;
    private BigDecimal grossLoss;
    private BigDecimal totalCredit;

    public Form32Record() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getBranchName() {
        return branchName;
    }

    public void setBranchName(String branchName) {
        this.branchName = branchName;
    }

    public BigDecimal getOpeningStock() {
        return openingStock;
    }

    public void setOpeningStock(BigDecimal openingStock) {
        this.openingStock = openingStock;
    }

    public BigDecimal getPurchases() {
        return purchases;
    }

    public void setPurchases(BigDecimal purchases) {
        this.purchases = purchases;
    }

    public BigDecimal getTransport() {
        return transport;
    }

    public void setTransport(BigDecimal transport) {
        this.transport = transport;
    }

    public BigDecimal getRent() {
        return rent;
    }

    public void setRent(BigDecimal rent) {
        this.rent = rent;
    }

    public BigDecimal getTraveling() {
        return traveling;
    }

    public void setTraveling(BigDecimal traveling) {
        this.traveling = traveling;
    }

    public BigDecimal getCustomDb1() {
        return customDb1;
    }

    public void setCustomDb1(BigDecimal customDb1) {
        this.customDb1 = customDb1;
    }

    public BigDecimal getCustomDb2() {
        return customDb2;
    }

    public void setCustomDb2(BigDecimal customDb2) {
        this.customDb2 = customDb2;
    }

    public BigDecimal getCustomDb3() {
        return customDb3;
    }

    public void setCustomDb3(BigDecimal customDb3) {
        this.customDb3 = customDb3;
    }

    public BigDecimal getGrossProfit() {
        return grossProfit;
    }

    public void setGrossProfit(BigDecimal grossProfit) {
        this.grossProfit = grossProfit;
    }

    public BigDecimal getTotalDebit() {
        return totalDebit;
    }

    public void setTotalDebit(BigDecimal totalDebit) {
        this.totalDebit = totalDebit;
    }

    public BigDecimal getSalesCash() {
        return salesCash;
    }

    public void setSalesCash(BigDecimal salesCash) {
        this.salesCash = salesCash;
    }

    public BigDecimal getSalesCredit() {
        return salesCredit;
    }

    public void setSalesCredit(BigDecimal salesCredit) {
        this.salesCredit = salesCredit;
    }

    public BigDecimal getTransfers() {
        return transfers;
    }

    public void setTransfers(BigDecimal transfers) {
        this.transfers = transfers;
    }

    public BigDecimal getTransportIncome() {
        return transportIncome;
    }

    public void setTransportIncome(BigDecimal transportIncome) {
        this.transportIncome = transportIncome;
    }

    public BigDecimal getRentIncome() {
        return rentIncome;
    }

    public void setRentIncome(BigDecimal rentIncome) {
        this.rentIncome = rentIncome;
    }

    public BigDecimal getCustomCr1() {
        return customCr1;
    }

    public void setCustomCr1(BigDecimal customCr1) {
        this.customCr1 = customCr1;
    }

    public BigDecimal getCustomCr2() {
        return customCr2;
    }

    public void setCustomCr2(BigDecimal customCr2) {
        this.customCr2 = customCr2;
    }

    public BigDecimal getCustomCr3() {
        return customCr3;
    }

    public void setCustomCr3(BigDecimal customCr3) {
        this.customCr3 = customCr3;
    }

    public BigDecimal getClosingStock() {
        return closingStock;
    }

    public void setClosingStock(BigDecimal closingStock) {
        this.closingStock = closingStock;
    }

    public BigDecimal getGrossLoss() {
        return grossLoss;
    }

    public void setGrossLoss(BigDecimal grossLoss) {
        this.grossLoss = grossLoss;
    }

    public BigDecimal getTotalCredit() {
        return totalCredit;
    }

    public void setTotalCredit(BigDecimal totalCredit) {
        this.totalCredit = totalCredit;
    }
}
