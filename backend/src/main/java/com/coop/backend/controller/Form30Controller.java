package com.coop.backend.controller;

import com.coop.backend.model.Form30Record;
import com.coop.backend.repository.Form30RecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/form30-records")
public class Form30Controller {

    @Autowired
    private Form30RecordRepository repository;

    @PostMapping("/bulk")
    public ResponseEntity<List<Form30Record>> saveBulkForm30Records(@RequestBody List<Form30Record> records) {
        List<Form30Record> savedRecords = repository.saveAll(records);
        return ResponseEntity.ok(savedRecords);
    }

    @GetMapping
    public ResponseEntity<List<Form30Record>> getAllForm30Records() {
        return ResponseEntity.ok(repository.findAll());
    }
}
