package com.coop.backend.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "form31_records")
public class Form31Record {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String vehicleNo;
    private String date;
    
    @ElementCollection
    @CollectionTable(name = "form31_driver_repairs", joinColumns = @JoinColumn(name = "form31_id"))
    @Column(name = "repair")
    private List<String> driverRepairs;
    
    private String driverSignature;

    @ElementCollection
    @CollectionTable(name = "form31_officer_repairs", joinColumns = @JoinColumn(name = "form31_id"))
    @Column(name = "repair")
    private List<String> officerRepairs;
    
    private String officerSignature;

    @Column(columnDefinition = "TEXT")
    private String managerComments;
    private String managerSignature;

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getVehicleNo() {
        return vehicleNo;
    }

    public void setVehicleNo(String vehicleNo) {
        this.vehicleNo = vehicleNo;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public List<String> getDriverRepairs() {
        return driverRepairs;
    }

    public void setDriverRepairs(List<String> driverRepairs) {
        this.driverRepairs = driverRepairs;
    }

    public String getDriverSignature() {
        return driverSignature;
    }

    public void setDriverSignature(String driverSignature) {
        this.driverSignature = driverSignature;
    }

    public List<String> getOfficerRepairs() {
        return officerRepairs;
    }

    public void setOfficerRepairs(List<String> officerRepairs) {
        this.officerRepairs = officerRepairs;
    }

    public String getOfficerSignature() {
        return officerSignature;
    }

    public void setOfficerSignature(String officerSignature) {
        this.officerSignature = officerSignature;
    }

    public String getManagerComments() {
        return managerComments;
    }

    public void setManagerComments(String managerComments) {
        this.managerComments = managerComments;
    }

    public String getManagerSignature() {
        return managerSignature;
    }

    public void setManagerSignature(String managerSignature) {
        this.managerSignature = managerSignature;
    }
}
