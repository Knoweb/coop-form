package com.coop.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDate;

@Entity
@Table(name = "form_25_records")
public class Form25Record {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Global fields
    private LocalDate date;
    private String time;
    private String formNo;
    private String loadedPlace;
    private String sentPlace;
    private String vehicleNo;

    // Item fields
    private String billNo;
    private String description;
    
    private Double packagesQty;
    private Double itemQty;
    
    private Double costUnitPrice;
    private Double costTotalPrice;
    
    private Double sellingPrice;
    
    private Double diffLess;
    private Double diffMore;
    
    private Double valLess;
    private Double valMore;
    
    private Double netAmount;
    
    private String remarks;

    public Form25Record() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }

    public String getTime() { return time; }
    public void setTime(String time) { this.time = time; }

    public String getFormNo() { return formNo; }
    public void setFormNo(String formNo) { this.formNo = formNo; }

    public String getLoadedPlace() { return loadedPlace; }
    public void setLoadedPlace(String loadedPlace) { this.loadedPlace = loadedPlace; }

    public String getSentPlace() { return sentPlace; }
    public void setSentPlace(String sentPlace) { this.sentPlace = sentPlace; }

    public String getVehicleNo() { return vehicleNo; }
    public void setVehicleNo(String vehicleNo) { this.vehicleNo = vehicleNo; }

    public String getBillNo() { return billNo; }
    public void setBillNo(String billNo) { this.billNo = billNo; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Double getPackagesQty() { return packagesQty; }
    public void setPackagesQty(Double packagesQty) { this.packagesQty = packagesQty; }

    public Double getItemQty() { return itemQty; }
    public void setItemQty(Double itemQty) { this.itemQty = itemQty; }

    public Double getCostUnitPrice() { return costUnitPrice; }
    public void setCostUnitPrice(Double costUnitPrice) { this.costUnitPrice = costUnitPrice; }

    public Double getCostTotalPrice() { return costTotalPrice; }
    public void setCostTotalPrice(Double costTotalPrice) { this.costTotalPrice = costTotalPrice; }

    public Double getSellingPrice() { return sellingPrice; }
    public void setSellingPrice(Double sellingPrice) { this.sellingPrice = sellingPrice; }

    public Double getDiffLess() { return diffLess; }
    public void setDiffLess(Double diffLess) { this.diffLess = diffLess; }

    public Double getDiffMore() { return diffMore; }
    public void setDiffMore(Double diffMore) { this.diffMore = diffMore; }

    public Double getValLess() { return valLess; }
    public void setValLess(Double valLess) { this.valLess = valLess; }

    public Double getValMore() { return valMore; }
    public void setValMore(Double valMore) { this.valMore = valMore; }

    public Double getNetAmount() { return netAmount; }
    public void setNetAmount(Double netAmount) { this.netAmount = netAmount; }

    public String getRemarks() { return remarks; }
    public void setRemarks(String remarks) { this.remarks = remarks; }
}
