package com.coop.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDate;

@Entity
@Table(name = "form_24_records")
public class Form24Record {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate date;
    
    private String store1Name;
    private String store2Name;
    private String store3Name;
    private String store4Name;

    private String serialNo;
    private String cardNo;
    private String item;
    
    private Double store1Qty;
    private Double store2Qty;
    private Double store3Qty;
    private Double store4Qty;
    private Double totalQty;

    public Form24Record() {
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }

    public String getStore1Name() { return store1Name; }
    public void setStore1Name(String store1Name) { this.store1Name = store1Name; }

    public String getStore2Name() { return store2Name; }
    public void setStore2Name(String store2Name) { this.store2Name = store2Name; }

    public String getStore3Name() { return store3Name; }
    public void setStore3Name(String store3Name) { this.store3Name = store3Name; }

    public String getStore4Name() { return store4Name; }
    public void setStore4Name(String store4Name) { this.store4Name = store4Name; }

    public String getSerialNo() { return serialNo; }
    public void setSerialNo(String serialNo) { this.serialNo = serialNo; }

    public String getCardNo() { return cardNo; }
    public void setCardNo(String cardNo) { this.cardNo = cardNo; }

    public String getItem() { return item; }
    public void setItem(String item) { this.item = item; }

    public Double getStore1Qty() { return store1Qty; }
    public void setStore1Qty(Double store1Qty) { this.store1Qty = store1Qty; }

    public Double getStore2Qty() { return store2Qty; }
    public void setStore2Qty(Double store2Qty) { this.store2Qty = store2Qty; }

    public Double getStore3Qty() { return store3Qty; }
    public void setStore3Qty(Double store3Qty) { this.store3Qty = store3Qty; }

    public Double getStore4Qty() { return store4Qty; }
    public void setStore4Qty(Double store4Qty) { this.store4Qty = store4Qty; }

    public Double getTotalQty() { return totalQty; }
    public void setTotalQty(Double totalQty) { this.totalQty = totalQty; }
}
