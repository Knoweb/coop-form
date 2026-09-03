package com.coop.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "schedule_2")
public class Schedule2Entity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String serialNo;
    private String noOfSection;
    private String placeOfWork;
    private String name;
    private String post;

    private Double initialSalary;
    private Double allowances;
    private Double specialAllowances;
    private Double othersEarnings;

    private Double totalApproved;
    private Double totalNonApproved;

    private Double monthlyAdvances;
    private Double festivalAdvances;
    private Double loans;
    private Double othersDeductions;
    private Double epfEmployee;

    private Double totalDeductions;
    private Double balancePaid;
    private Double employeesEpf;
}
