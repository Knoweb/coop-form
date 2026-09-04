package com.coop.backend.controller;

import com.coop.backend.model.F29Record;
import com.coop.backend.repository.F29RecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/f29-records")
public class F29Controller {

    @Autowired
    private F29RecordRepository repository;

    @GetMapping
    public List<F29Record> getAllRecords() {
        return repository.findAll();
    }

    @PostMapping
    public ResponseEntity<F29Record> createRecord(@RequestBody F29Record record) {
        F29Record savedRecord = repository.save(record);
        return ResponseEntity.ok(savedRecord);
    }
}
