package com.coop.backend.controller;

import com.coop.backend.model.StationeryJournalEntity;
import com.coop.backend.repository.StationeryJournalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/stationery-journal")
public class StationeryJournalController {

    @Autowired
    private StationeryJournalRepository repository;

    @GetMapping
    public List<StationeryJournalEntity> getAllRecords() {
        return repository.findAll();
    }

    @PostMapping
    public StationeryJournalEntity saveRecord(@RequestBody StationeryJournalEntity record) {
        return repository.save(record);
    }
}
