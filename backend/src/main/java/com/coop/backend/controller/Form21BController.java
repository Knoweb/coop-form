package com.coop.backend.controller;

import com.coop.backend.model.Form21BEntity;
import com.coop.backend.repository.Form21BRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/form-21b")
public class Form21BController {

    @Autowired
    private Form21BRepository repository;

    @GetMapping
    public List<Form21BEntity> getAllRecords() {
        return repository.findAll();
    }

    @PostMapping
    public Form21BEntity createRecord(@RequestBody Form21BEntity record) {
        return repository.save(record);
    }
}
