package com.coop.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDate;

@Entity
@Table(name = "form_27_records")
public class Form27Record {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate date;
    
    private String bank1AccNo;
    private String bank2AccNo;
    private String bank3AccNo;

    @Column(columnDefinition="TEXT")
    private String summaryDataJson;

    @Column(columnDefinition="TEXT")
    private String chequesDataJson;

    public Form27Record() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }

    public String getBank1AccNo() { return bank1AccNo; }
    public void setBank1AccNo(String bank1AccNo) { this.bank1AccNo = bank1AccNo; }

    public String getBank2AccNo() { return bank2AccNo; }
    public void setBank2AccNo(String bank2AccNo) { this.bank2AccNo = bank2AccNo; }

    public String getBank3AccNo() { return bank3AccNo; }
    public void setBank3AccNo(String bank3AccNo) { this.bank3AccNo = bank3AccNo; }

    public String getSummaryDataJson() { return summaryDataJson; }
    public void setSummaryDataJson(String summaryDataJson) { this.summaryDataJson = summaryDataJson; }

    public String getChequesDataJson() { return chequesDataJson; }
    public void setChequesDataJson(String chequesDataJson) { this.chequesDataJson = chequesDataJson; }
}
