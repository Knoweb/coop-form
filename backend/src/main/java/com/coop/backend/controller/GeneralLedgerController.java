package com.coop.backend.controller;

import com.coop.backend.model.GeneralLedgerEntity;
import com.coop.backend.repository.GeneralLedgerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/general-ledger")
public class GeneralLedgerController {

    @Autowired
    private GeneralLedgerRepository repository;

    @GetMapping
    public List<GeneralLedgerEntity> getAllRecords() {
        return repository.findAll();
    }

    @PostMapping
    public GeneralLedgerEntity saveRecord(@RequestBody GeneralLedgerEntity record) {
        return repository.save(record);
    }
}
