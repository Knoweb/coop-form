package com.coop.backend.controller;

import com.coop.backend.model.Form9CRecord;
import com.coop.backend.repository.Form9CRecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/form9c-records")
@CrossOrigin(origins = "*") // Allow React frontend
public class Form9CController {

    @Autowired
    private Form9CRecordRepository repository;

    @GetMapping
    public List<Form9CRecord> getAllRecords() {
        return repository.findAll();
    }

    @PostMapping
    public Form9CRecord createRecord(@RequestBody Form9CRecord record) {
        return repository.save(record);
    }
}
