package com.coop.backend.controller;

import com.coop.backend.model.StoreTransferEntity;
import com.coop.backend.repository.StoreTransferRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/store-transfer")
public class StoreTransferController {

    @Autowired
    private StoreTransferRepository repository;

    @GetMapping
    public List<StoreTransferEntity> getAllRecords() {
        return repository.findAll();
    }

    @PostMapping
    public StoreTransferEntity createRecord(@RequestBody StoreTransferEntity record) {
        return repository.save(record);
    }
}
