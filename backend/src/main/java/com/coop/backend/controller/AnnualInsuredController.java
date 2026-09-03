package com.coop.backend.controller;

import com.coop.backend.model.AnnualInsuredEntity;
import com.coop.backend.repository.AnnualInsuredRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/annual-insured")
public class AnnualInsuredController {

    @Autowired
    private AnnualInsuredRepository repository;

    @GetMapping
    public List<AnnualInsuredEntity> getAllRecords() {
        return repository.findAll();
    }

    @PostMapping
    public AnnualInsuredEntity saveRecord(@RequestBody AnnualInsuredEntity record) {
        return repository.save(record);
    }
}
