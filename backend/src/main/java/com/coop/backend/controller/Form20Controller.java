package com.coop.backend.controller;

import com.coop.backend.model.Form20Entity;
import com.coop.backend.repository.Form20Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/form-20")
public class Form20Controller {

    @Autowired
    private Form20Repository repository;

    @GetMapping
    public List<Form20Entity> getAllRecords() {
        return repository.findAll();
    }

    @PostMapping
    public Form20Entity createRecord(@RequestBody Form20Entity record) {
        return repository.save(record);
    }
}
