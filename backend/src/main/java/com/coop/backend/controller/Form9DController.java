package com.coop.backend.controller;

import com.coop.backend.model.Form9DRecord;
import com.coop.backend.repository.Form9DRecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/form9d-records")
@CrossOrigin(origins = "http://localhost:5174")
public class Form9DController {

    @Autowired
    private Form9DRecordRepository repository;

    @GetMapping
    public List<Form9DRecord> getAllRecords() {
        return repository.findAll();
    }

    @PostMapping
    public Form9DRecord createRecord(@RequestBody Form9DRecord record) {
        return repository.save(record);
    }
}
