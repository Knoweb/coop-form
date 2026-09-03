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
    private Double aPaHaalAmount;
    private Double patawumAmount;
    private Double hisBhajanaAmount;
    private Double prawahanaAmount;

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

    public Double getAPaHaalAmount() { return aPaHaalAmount; }
    public void setAPaHaalAmount(Double aPaHaalAmount) { this.aPaHaalAmount = aPaHaalAmount; }

    public Double getPatawumAmount() { return patawumAmount; }
    public void setPatawumAmount(Double patawumAmount) { this.patawumAmount = patawumAmount; }

    public Double getHisBhajanaAmount() { return hisBhajanaAmount; }
    public void setHisBhajanaAmount(Double hisBhajanaAmount) { this.hisBhajanaAmount = hisBhajanaAmount; }

    public Double getPrawahanaAmount() { return prawahanaAmount; }
    public void setPrawahanaAmount(Double prawahanaAmount) { this.prawahanaAmount = prawahanaAmount; }
}
