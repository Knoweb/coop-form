package com.coop.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDate;

@Entity
@Table(name = "form_30_records")
public class Form30Record {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String societyName;
    private LocalDate date;
    private String vehicleNo;

    private String category; // "WHOLESALE" or "RETAIL"
    private Integer rowIndex; // 1-5 or 1-12

    private Double prevDateRs;
    private Double prevDateCts;

    private Double todayRs;
    private Double todayCts;

    private Double totalRs;
    private Double totalCts;

    public Form30Record() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getSocietyName() { return societyName; }
    public void setSocietyName(String societyName) { this.societyName = societyName; }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }

    public String getVehicleNo() { return vehicleNo; }
    public void setVehicleNo(String vehicleNo) { this.vehicleNo = vehicleNo; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public Integer getRowIndex() { return rowIndex; }
    public void setRowIndex(Integer rowIndex) { this.rowIndex = rowIndex; }

    public Double getPrevDateRs() { return prevDateRs; }
    public void setPrevDateRs(Double prevDateRs) { this.prevDateRs = prevDateRs; }

    public Double getPrevDateCts() { return prevDateCts; }
    public void setPrevDateCts(Double prevDateCts) { this.prevDateCts = prevDateCts; }

    public Double getTodayRs() { return todayRs; }
    public void setTodayRs(Double todayRs) { this.todayRs = todayRs; }

    public Double getTodayCts() { return todayCts; }
    public void setTodayCts(Double todayCts) { this.todayCts = todayCts; }

    public Double getTotalRs() { return totalRs; }
    public void setTotalRs(Double totalRs) { this.totalRs = totalRs; }

    public Double getTotalCts() { return totalCts; }
    public void setTotalCts(Double totalCts) { this.totalCts = totalCts; }
}
