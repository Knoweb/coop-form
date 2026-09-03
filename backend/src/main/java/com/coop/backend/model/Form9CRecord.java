package com.coop.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDate;

@Entity
@Table(name = "form_9c_records")
public class Form9CRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate date;
    private String storeName;
    private String billNo;
    private String name;
    private String folio;
    
    private Double totalAmount;
    private Double goodsAmount;
    private Double aPaKoAmount;
    private Double teaPoAmount;
    private Double emptySacksAmount;
    private Double otherAmount;

    // Default constructor
    public Form9CRecord() {
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }

    public String getStoreName() { return storeName; }
    public void setStoreName(String storeName) { this.storeName = storeName; }

    public String getBillNo() { return billNo; }
    public void setBillNo(String billNo) { this.billNo = billNo; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getFolio() { return folio; }
    public void setFolio(String folio) { this.folio = folio; }

    public Double getTotalAmount() { return totalAmount; }
    public void setTotalAmount(Double totalAmount) { this.totalAmount = totalAmount; }

    public Double getGoodsAmount() { return goodsAmount; }
    public void setGoodsAmount(Double goodsAmount) { this.goodsAmount = goodsAmount; }

    public Double getAPaKoAmount() { return aPaKoAmount; }
    public void setAPaKoAmount(Double aPaKoAmount) { this.aPaKoAmount = aPaKoAmount; }

    public Double getTeaPoAmount() { return teaPoAmount; }
    public void setTeaPoAmount(Double teaPoAmount) { this.teaPoAmount = teaPoAmount; }

    public Double getEmptySacksAmount() { return emptySacksAmount; }
    public void setEmptySacksAmount(Double emptySacksAmount) { this.emptySacksAmount = emptySacksAmount; }

    public Double getOtherAmount() { return otherAmount; }
    public void setOtherAmount(Double otherAmount) { this.otherAmount = otherAmount; }
}
