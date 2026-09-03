package com.coop.backend.controller;

import com.coop.backend.model.PettyCashRecord;
import com.coop.backend.repository.PettyCashRecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/records")
@CrossOrigin(origins = "http://localhost:5173") // Allow React frontend
public class PettyCashController {

    @Autowired
    private PettyCashRecordRepository repository;

    @GetMapping
    public List<PettyCashRecord> getAllRecords() {
        return repository.findAll();
    }

    @PostMapping
    public PettyCashRecord createRecord(@RequestBody PettyCashRecord record) {
        return repository.save(record);
    }
}
