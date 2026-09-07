package com.coop.backend.controller;

import com.coop.backend.model.Form25Record;
import com.coop.backend.repository.Form25RecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/form25-records")

public class Form25Controller {

    @Autowired
    private Form25RecordRepository repository;

    @GetMapping
    public List<Form25Record> getAllRecords() {
        return repository.findAll();
    }

    @PostMapping
    public Form25Record createRecord(@RequestBody Form25Record record) {
        return repository.save(record);
    }

    @PostMapping("/bulk")
    public List<Form25Record> createRecords(@RequestBody List<Form25Record> records) {
        return repository.saveAll(records);
    }
}
