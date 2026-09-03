package com.coop.backend.controller;

import com.coop.backend.model.Form23ARecord;
import com.coop.backend.repository.Form23ARecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/form23a-records")
@CrossOrigin(origins = "*") // Allow React frontend
public class Form23AController {

    @Autowired
    private Form23ARecordRepository repository;

    @GetMapping
    public List<Form23ARecord> getAllRecords() {
        return repository.findAll();
    }

    @PostMapping
    public Form23ARecord createRecord(@RequestBody Form23ARecord record) {
        return repository.save(record);
    }

    @PostMapping("/bulk")
    public List<Form23ARecord> createRecords(@RequestBody List<Form23ARecord> records) {
        return repository.saveAll(records);
    }
}
