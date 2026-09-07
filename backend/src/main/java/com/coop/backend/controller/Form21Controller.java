package com.coop.backend.controller;

import com.coop.backend.model.Form21Entity;
import com.coop.backend.repository.Form21Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/form-21")
public class Form21Controller {

    @Autowired
    private Form21Repository repository;

    @GetMapping
    public List<Form21Entity> getAllRecords() {
        return repository.findAll();
    }

    @PostMapping
    public Form21Entity createRecord(@RequestBody Form21Entity record) {
        return repository.save(record);
    }
}
