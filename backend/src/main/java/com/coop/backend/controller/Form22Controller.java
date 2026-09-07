package com.coop.backend.controller;

import com.coop.backend.model.Form22Entity;
import com.coop.backend.repository.Form22Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/form-22")
public class Form22Controller {

    @Autowired
    private Form22Repository repository;

    @GetMapping
    public List<Form22Entity> getAllRecords() {
        return repository.findAll();
    }

    @PostMapping
    public Form22Entity createRecord(@RequestBody Form22Entity record) {
        return repository.save(record);
    }
}
