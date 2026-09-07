package com.coop.backend.controller;

import com.coop.backend.model.Form16DEntity;
import com.coop.backend.repository.Form16DRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/form-16d")
public class Form16DController {

    @Autowired
    private Form16DRepository repository;

    @GetMapping
    public List<Form16DEntity> getAllRecords() {
        return repository.findAll();
    }

    @PostMapping
    public Form16DEntity createRecord(@RequestBody Form16DEntity record) {
        return repository.save(record);
    }
}
