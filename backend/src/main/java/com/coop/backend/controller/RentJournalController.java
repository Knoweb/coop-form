package com.coop.backend.controller;

import com.coop.backend.model.RentJournalEntity;
import com.coop.backend.repository.RentJournalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rent-journal")
public class RentJournalController {

    @Autowired
    private RentJournalRepository rentJournalRepository;

    @GetMapping
    public List<RentJournalEntity> getAllRecords() {
        return rentJournalRepository.findAll();
    }

    @PostMapping
    public RentJournalEntity saveRecord(@RequestBody RentJournalEntity record) {
        return rentJournalRepository.save(record);
    }
}
