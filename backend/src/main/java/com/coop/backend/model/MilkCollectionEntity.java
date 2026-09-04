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
@Table(name = "milk_collection_form15m")
@NoArgsConstructor
public class MilkCollectionEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String date;

    private Double receivedMorning;
    private Double receivedEvening;
    private Double totalReceived;
    private Double excess;
    private Double grandTotalReceived;

    private Double issuedMorning;
    private Double issuedEvening;
    private Double totalIssued;
    private Double spoiledReturned;
    private Double shortage;
    private Double grandTotalIssued;
}
