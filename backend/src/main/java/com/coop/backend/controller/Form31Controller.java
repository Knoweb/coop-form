package com.coop.backend.controller;

import com.coop.backend.model.Form31Record;
import com.coop.backend.repository.Form31Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/form31")
public class Form31Controller {

    @Autowired
    private Form31Repository repository;

    @GetMapping("/records")
    public List<Form31Record> getAllRecords() {
        return repository.findAll();
    }

    @PostMapping("/records")
    public ResponseEntity<Form31Record> createRecord(@RequestBody Form31Record record) {
        Form31Record savedRecord = repository.save(record);
        return ResponseEntity.ok(savedRecord);
    }
}
