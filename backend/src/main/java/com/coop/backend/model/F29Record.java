package com.coop.backend.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "f29_records_office")
public class F29Record {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String date;
    private String vehicleNo;

    private String meterEndOfDay;
    private String meterPrevDay;
    private String meterWorkedMiles;

    private String preparedBy;
    private String checkedBy;
    private String signDate;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "f29_record_id")
    private List<F29Row> rows;

    // Getters and Setters
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getDate() {
        return date;
    }
    public void setDate(String date) {
        this.date = date;
    }
    public String getVehicleNo() {
        return vehicleNo;
    }
    public void setVehicleNo(String vehicleNo) {
        this.vehicleNo = vehicleNo;
    }
    public String getMeterEndOfDay() {
        return meterEndOfDay;
    }
    public void setMeterEndOfDay(String meterEndOfDay) {
        this.meterEndOfDay = meterEndOfDay;
    }
    public String getMeterPrevDay() {
        return meterPrevDay;
    }
    public void setMeterPrevDay(String meterPrevDay) {
        this.meterPrevDay = meterPrevDay;
    }
    public String getMeterWorkedMiles() {
        return meterWorkedMiles;
    }
    public void setMeterWorkedMiles(String meterWorkedMiles) {
        this.meterWorkedMiles = meterWorkedMiles;
    }
    public String getPreparedBy() {
        return preparedBy;
    }
    public void setPreparedBy(String preparedBy) {
        this.preparedBy = preparedBy;
    }
    public String getCheckedBy() {
        return checkedBy;
    }
    public void setCheckedBy(String checkedBy) {
        this.checkedBy = checkedBy;
    }
    public String getSignDate() {
        return signDate;
    }
    public void setSignDate(String signDate) {
        this.signDate = signDate;
    }
    public List<F29Row> getRows() {
        return rows;
    }
    public void setRows(List<F29Row> rows) {
        this.rows = rows;
    }
}
