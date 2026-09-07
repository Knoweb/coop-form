package com.coop.backend.controller;

import com.coop.backend.model.Form32AEntity;
import com.coop.backend.repository.Form32ARepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/form-32a")
public class Form32AController {

    @Autowired
    private Form32ARepository repository;

    @GetMapping
    public List<Form32AEntity> getAllRecords() {
        return repository.findAll();
    }

    @PostMapping
    public Form32AEntity createRecord(@RequestBody Form32AEntity record) {
        return repository.save(record);
    }
}
