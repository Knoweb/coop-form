package com.coop.backend.controller;

import com.coop.backend.model.Form9ERecord;
import com.coop.backend.repository.Form9ERecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/form9e-records")

public class Form9EController {

    @Autowired
    private Form9ERecordRepository repository;

    @GetMapping
    public List<Form9ERecord> getAllRecords() {
        return repository.findAll();
    }

    @PostMapping
    public Form9ERecord createRecord(@RequestBody Form9ERecord record) {
        return repository.save(record);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteRecord(@PathVariable Long id) {
        return repository.findById(id)
                .map(record -> {
                    repository.delete(record);
                    return ResponseEntity.ok().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
