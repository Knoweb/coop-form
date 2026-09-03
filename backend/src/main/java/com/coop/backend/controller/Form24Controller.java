package com.coop.backend.controller;

import com.coop.backend.model.Form24Record;
import com.coop.backend.repository.Form24RecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/form24-records")
@CrossOrigin(origins = "*") // Allow React frontend
public class Form24Controller {

    @Autowired
    private Form24RecordRepository repository;

    @GetMapping
    public List<Form24Record> getAllRecords() {
        return repository.findAll();
    }

    @PostMapping
    public Form24Record createRecord(@RequestBody Form24Record record) {
        return repository.save(record);
    }

    @PostMapping("/bulk")
    public List<Form24Record> createRecords(@RequestBody List<Form24Record> records) {
        return repository.saveAll(records);
    }
}
