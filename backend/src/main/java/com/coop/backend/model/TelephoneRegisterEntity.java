package com.coop.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "telephone_register")
@NoArgsConstructor
public class TelephoneRegisterEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String date;
    private String callerName;
    private String calledNumberArea;
    private String timeTakenMinutes;
    private String callSummary;
    private String signature;
    private Double officialCost;
    private Double privateCost;
    private String receiptNo;
}
