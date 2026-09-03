package com.coop.backend.controller;

import com.coop.backend.model.MonthlyDepreciationEntity;
import com.coop.backend.repository.MonthlyDepreciationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/monthly-depreciation")
public class MonthlyDepreciationController {

    @Autowired
    private MonthlyDepreciationRepository repository;

    @GetMapping
    public List<MonthlyDepreciationEntity> getAllRecords() {
        return repository.findAll();
    }

    @PostMapping
    public MonthlyDepreciationEntity saveRecord(@RequestBody MonthlyDepreciationEntity record) {
        return repository.save(record);
    }
}
