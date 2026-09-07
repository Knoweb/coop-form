package com.coop.backend.controller;

import com.coop.backend.model.Form27Record;
import com.coop.backend.repository.Form27RecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/form27-records")

public class Form27Controller {

    @Autowired
    private Form27RecordRepository repository;

    @GetMapping
    public List<Form27Record> getAllRecords() {
        return repository.findAll();
    }

    @PostMapping
    public ResponseEntity<Form27Record> createRecord(@RequestBody Form27Record record) {
        Form27Record savedRecord = repository.save(record);
        return ResponseEntity.ok(savedRecord);
    }
}
