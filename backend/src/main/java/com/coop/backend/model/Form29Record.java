package com.coop.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDate;

@Entity
@Table(name = "form_29_records")
public class Form29Record {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Global Fields
    private String vehicleNo;
    private LocalDate date;
    private String driverName;
    private String assistantName;
    private String workedHoursDaily;
    private String workedHoursWeekly;

    private String signature1;
    private String signature2;
    private String otHours1;
    private String otHours2;

    private String licenseNo;
    private String meterStart;
    private String meterEnd;
    private String drivenMiles;

    private String authOfficerSig;
    private String workStartTime;
    private String workEndTime;
    private String obtainedFuel;
    private String remainingFuel;

    // Item Fields
    private String tripNo;
    private String goodsDetails;
    private String qtyTons;
    private String qtyCwts;
    private String qtyLbs;
    private String depTime;
    private String depPlace;
    private String authOfficerSigItem;
    private String arrTime;
    private String arrPlace;
    private String receivingOfficerSig;
    private String drivenForWhom;
    private Double amount;

    public Form29Record() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getVehicleNo() { return vehicleNo; }
    public void setVehicleNo(String vehicleNo) { this.vehicleNo = vehicleNo; }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }

    public String getDriverName() { return driverName; }
    public void setDriverName(String driverName) { this.driverName = driverName; }

    public String getAssistantName() { return assistantName; }
    public void setAssistantName(String assistantName) { this.assistantName = assistantName; }

    public String getWorkedHoursDaily() { return workedHoursDaily; }
    public void setWorkedHoursDaily(String workedHoursDaily) { this.workedHoursDaily = workedHoursDaily; }

    public String getWorkedHoursWeekly() { return workedHoursWeekly; }
    public void setWorkedHoursWeekly(String workedHoursWeekly) { this.workedHoursWeekly = workedHoursWeekly; }

    public String getSignature1() { return signature1; }
    public void setSignature1(String signature1) { this.signature1 = signature1; }

    public String getSignature2() { return signature2; }
    public void setSignature2(String signature2) { this.signature2 = signature2; }

    public String getOtHours1() { return otHours1; }
    public void setOtHours1(String otHours1) { this.otHours1 = otHours1; }

    public String getOtHours2() { return otHours2; }
    public void setOtHours2(String otHours2) { this.otHours2 = otHours2; }

    public String getLicenseNo() { return licenseNo; }
    public void setLicenseNo(String licenseNo) { this.licenseNo = licenseNo; }

    public String getMeterStart() { return meterStart; }
    public void setMeterStart(String meterStart) { this.meterStart = meterStart; }

    public String getMeterEnd() { return meterEnd; }
    public void setMeterEnd(String meterEnd) { this.meterEnd = meterEnd; }

    public String getDrivenMiles() { return drivenMiles; }
    public void setDrivenMiles(String drivenMiles) { this.drivenMiles = drivenMiles; }

    public String getAuthOfficerSig() { return authOfficerSig; }
    public void setAuthOfficerSig(String authOfficerSig) { this.authOfficerSig = authOfficerSig; }

    public String getWorkStartTime() { return workStartTime; }
    public void setWorkStartTime(String workStartTime) { this.workStartTime = workStartTime; }

    public String getWorkEndTime() { return workEndTime; }
    public void setWorkEndTime(String workEndTime) { this.workEndTime = workEndTime; }

    public String getObtainedFuel() { return obtainedFuel; }
    public void setObtainedFuel(String obtainedFuel) { this.obtainedFuel = obtainedFuel; }

    public String getRemainingFuel() { return remainingFuel; }
    public void setRemainingFuel(String remainingFuel) { this.remainingFuel = remainingFuel; }

    public String getTripNo() { return tripNo; }
    public void setTripNo(String tripNo) { this.tripNo = tripNo; }

    public String getGoodsDetails() { return goodsDetails; }
    public void setGoodsDetails(String goodsDetails) { this.goodsDetails = goodsDetails; }

    public String getQtyTons() { return qtyTons; }
    public void setQtyTons(String qtyTons) { this.qtyTons = qtyTons; }

    public String getQtyCwts() { return qtyCwts; }
    public void setQtyCwts(String qtyCwts) { this.qtyCwts = qtyCwts; }

    public String getQtyLbs() { return qtyLbs; }
    public void setQtyLbs(String qtyLbs) { this.qtyLbs = qtyLbs; }

    public String getDepTime() { return depTime; }
    public void setDepTime(String depTime) { this.depTime = depTime; }

    public String getDepPlace() { return depPlace; }
    public void setDepPlace(String depPlace) { this.depPlace = depPlace; }

    public String getAuthOfficerSigItem() { return authOfficerSigItem; }
    public void setAuthOfficerSigItem(String authOfficerSigItem) { this.authOfficerSigItem = authOfficerSigItem; }

    public String getArrTime() { return arrTime; }
    public void setArrTime(String arrTime) { this.arrTime = arrTime; }

    public String getArrPlace() { return arrPlace; }
    public void setArrPlace(String arrPlace) { this.arrPlace = arrPlace; }

    public String getReceivingOfficerSig() { return receivingOfficerSig; }
    public void setReceivingOfficerSig(String receivingOfficerSig) { this.receivingOfficerSig = receivingOfficerSig; }

    public String getDrivenForWhom() { return drivenForWhom; }
    public void setDrivenForWhom(String drivenForWhom) { this.drivenForWhom = drivenForWhom; }

    public Double getAmount() { return amount; }
    public void setAmount(Double amount) { this.amount = amount; }
}
