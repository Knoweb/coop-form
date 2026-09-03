package com.coop.backend.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "form_2")
public class PettyCashRecordForm2 {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String storeName;
    private LocalDate fromDate;
    private LocalDate toDate;

    private Double amountReceived;
    private LocalDate date;
    private String description;
    private String voucherNo;
    private Double amountPaid;
    private Double balance;

    private Double transport;
    private Double stationery;
    private Double postage;
    private Double meals;
    private Double other;

    private Double total;
    private String note;

    public PettyCashRecordForm2() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getStoreName() { return storeName; }
    public void setStoreName(String storeName) { this.storeName = storeName; }

    public LocalDate getFromDate() { return fromDate; }
    public void setFromDate(LocalDate fromDate) { this.fromDate = fromDate; }

    public LocalDate getToDate() { return toDate; }
    public void setToDate(LocalDate toDate) { this.toDate = toDate; }

    public Double getAmountReceived() { return amountReceived; }
    public void setAmountReceived(Double amountReceived) { this.amountReceived = amountReceived; }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getVoucherNo() { return voucherNo; }
    public void setVoucherNo(String voucherNo) { this.voucherNo = voucherNo; }

    public Double getAmountPaid() { return amountPaid; }
    public void setAmountPaid(Double amountPaid) { this.amountPaid = amountPaid; }

    public Double getBalance() { return balance; }
    public void setBalance(Double balance) { this.balance = balance; }

    public Double getTransport() { return transport; }
    public void setTransport(Double transport) { this.transport = transport; }

    public Double getStationery() { return stationery; }
    public void setStationery(Double stationery) { this.stationery = stationery; }

    public Double getPostage() { return postage; }
    public void setPostage(Double postage) { this.postage = postage; }

    public Double getMeals() { return meals; }
    public void setMeals(Double meals) { this.meals = meals; }

    public Double getOther() { return other; }
    public void setOther(Double other) { this.other = other; }

    public Double getTotal() { return total; }
    public void setTotal(Double total) { this.total = total; }

    public String getNote() { return note; }
    public void setNote(String note) { this.note = note; }
}
