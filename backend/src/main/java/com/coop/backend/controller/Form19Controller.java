package com.coop.backend.controller;

import com.coop.backend.model.Form19Entity;
import com.coop.backend.repository.Form19Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/form-19")
public class Form19Controller {

    @Autowired
    private Form19Repository repository;

    @GetMapping
    public List<Form19Entity> getAllRecords() {
        return repository.findAll();
    }

    @PostMapping
    public Form19Entity createRecord(@RequestBody Form19Entity record) {
        return repository.save(record);
    }
}
