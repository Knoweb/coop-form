package com.coop.backend.controller;

import com.coop.backend.model.Form32Record;
import com.coop.backend.repository.Form32Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/form32")
public class Form32Controller {

    @Autowired
    private Form32Repository repository;

    @GetMapping
    public List<Form32Record> getAllRecords() {
        return repository.findAll();
    }

    @PostMapping
    public ResponseEntity<List<Form32Record>> saveRecords(@RequestBody List<Form32Record> records) {
        List<Form32Record> savedRecords = repository.saveAll(records);
        return ResponseEntity.ok(savedRecords);
    }
}
