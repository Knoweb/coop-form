package com.coop.backend.controller;

import com.coop.backend.model.Form21AEntity;
import com.coop.backend.repository.Form21ARepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/form-21a")
public class Form21AController {

    @Autowired
    private Form21ARepository repository;

    @GetMapping
    public List<Form21AEntity> getAllRecords() {
        return repository.findAll();
    }

    @PostMapping
    public Form21AEntity createRecord(@RequestBody Form21AEntity record) {
        return repository.save(record);
    }
}
