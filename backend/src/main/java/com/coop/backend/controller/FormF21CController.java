package com.coop.backend.controller;

import com.coop.backend.model.FormF21CEntity;
import com.coop.backend.repository.FormF21CRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/form-f21c")
public class FormF21CController {

    @Autowired
    private FormF21CRepository repository;

    @GetMapping
    public List<FormF21CEntity> getAllRecords() {
        return repository.findAll();
    }

    @PostMapping
    public List<FormF21CEntity> createRecords(@RequestBody List<FormF21CEntity> records) {
        return repository.saveAll(records);
    }
}
