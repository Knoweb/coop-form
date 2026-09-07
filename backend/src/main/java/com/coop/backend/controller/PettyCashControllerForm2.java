package com.coop.backend.controller;

import com.coop.backend.model.PettyCashRecordForm2;
import com.coop.backend.repository.PettyCashRecordForm2Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/form2/records")

public class PettyCashControllerForm2 {

    @Autowired
    private PettyCashRecordForm2Repository repository;

    @GetMapping
    public List<PettyCashRecordForm2> getAllRecords() {
        return repository.findAll();
    }

    @PostMapping
    public PettyCashRecordForm2 createRecord(@RequestBody PettyCashRecordForm2 record) {
        return repository.save(record);
    }
}
