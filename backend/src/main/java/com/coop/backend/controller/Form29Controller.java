package com.coop.backend.controller;

import com.coop.backend.model.Form29Record;
import com.coop.backend.repository.Form29RecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/form29-records")
public class Form29Controller {

    @Autowired
    private Form29RecordRepository repository;

    @GetMapping
    public List<Form29Record> getAllRecords() {
        return repository.findAll();
    }

    @PostMapping
    public Form29Record createRecord(@RequestBody Form29Record record) {
        return repository.save(record);
    }

    @PostMapping("/bulk")
    public List<Form29Record> createRecords(@RequestBody List<Form29Record> records) {
        return repository.saveAll(records);
    }
}
