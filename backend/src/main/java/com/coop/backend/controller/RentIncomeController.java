package com.coop.backend.controller;

import com.coop.backend.model.RentIncomeEntity;
import com.coop.backend.repository.RentIncomeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rent-income")
public class RentIncomeController {

    @Autowired
    private RentIncomeRepository repository;

    @GetMapping
    public List<RentIncomeEntity> getAllRecords() {
        return repository.findAll();
    }

    @PostMapping
    public RentIncomeEntity saveRecord(@RequestBody RentIncomeEntity record) {
        return repository.save(record);
    }
}
