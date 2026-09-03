package com.coop.backend.controller;

import com.coop.backend.model.InvestmentInterestEntity;
import com.coop.backend.repository.InvestmentInterestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/investment-interest")
public class InvestmentInterestController {

    @Autowired
    private InvestmentInterestRepository repository;

    @GetMapping
    public List<InvestmentInterestEntity> getAllRecords() {
        return repository.findAll();
    }

    @PostMapping
    public InvestmentInterestEntity saveRecord(@RequestBody InvestmentInterestEntity record) {
        return repository.save(record);
    }
}
