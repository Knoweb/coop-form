package com.coop.backend.controller;

import com.coop.backend.model.Form16AEntity;
import com.coop.backend.repository.Form16ARepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/form-16a")
public class Form16AController {

    @Autowired
    private Form16ARepository repository;

    @GetMapping
    public List<Form16AEntity> getAllRecords() {
        return repository.findAll();
    }

    @PostMapping
    public Form16AEntity createRecord(@RequestBody Form16AEntity record) {
        return repository.save(record);
    }
}
