package com.coop.backend.controller;

import com.coop.backend.model.MilkCollectionEntity;
import com.coop.backend.repository.MilkCollectionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/form-15m-milk")
public class MilkCollectionController {

    @Autowired
    private MilkCollectionRepository repository;

    @GetMapping
    public List<MilkCollectionEntity> getAllRecords() {
        return repository.findAll();
    }

    @PostMapping
    public MilkCollectionEntity createRecord(@RequestBody MilkCollectionEntity record) {
        return repository.save(record);
    }
}
