package com.coop.backend.controller;

import com.coop.backend.model.Form23Entity;
import com.coop.backend.repository.Form23Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/form-23")
public class Form23Controller {

    @Autowired
    private Form23Repository repository;

    @GetMapping
    public List<Form23Entity> getAllRecords() {
        return repository.findAll();
    }

    @PostMapping
    public Form23Entity createRecord(@RequestBody Form23Entity record) {
        return repository.save(record);
    }
}
