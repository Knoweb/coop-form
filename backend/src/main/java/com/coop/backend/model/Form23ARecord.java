package com.coop.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDate;

@Entity
@Table(name = "form_23a_records")
public class Form23ARecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String storeName;
    private LocalDate date;
    
    private String serialNo;
    private String description;
    private Double requestedQuantity;
    private Double issuedQuantity;
    private String otherDetails;

    public Form23ARecord() {
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getStoreName() { return storeName; }
    public void setStoreName(String storeName) { this.storeName = storeName; }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }

    public String getSerialNo() { return serialNo; }
    public void setSerialNo(String serialNo) { this.serialNo = serialNo; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Double getRequestedQuantity() { return requestedQuantity; }
    public void setRequestedQuantity(Double requestedQuantity) { this.requestedQuantity = requestedQuantity; }

    public Double getIssuedQuantity() { return issuedQuantity; }
    public void setIssuedQuantity(Double issuedQuantity) { this.issuedQuantity = issuedQuantity; }

    public String getOtherDetails() { return otherDetails; }
    public void setOtherDetails(String otherDetails) { this.otherDetails = otherDetails; }
}
