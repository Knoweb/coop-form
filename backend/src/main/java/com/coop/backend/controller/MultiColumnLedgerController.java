package com.coop.backend.controller;

import com.coop.backend.model.MultiColumnLedgerEntity;
import com.coop.backend.repository.MultiColumnLedgerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/multi-column-ledger")
public class MultiColumnLedgerController {

    @Autowired
    private MultiColumnLedgerRepository repository;

    @GetMapping
    public List<MultiColumnLedgerEntity> getAllRecords() {
        return repository.findAll();
    }

    @PostMapping
    public MultiColumnLedgerEntity saveRecord(@RequestBody MultiColumnLedgerEntity record) {
        return repository.save(record);
    }
}
