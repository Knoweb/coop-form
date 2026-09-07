package com.coop.backend.controller;

import com.coop.backend.model.Form17Entity;
import com.coop.backend.repository.Form17Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/form-17")
public class Form17Controller {

    @Autowired
    private Form17Repository repository;

    @GetMapping
    public List<Form17Entity> getAllRecords() {
        return repository.findAll();
    }

    @PostMapping
    public Form17Entity createRecord(@RequestBody Form17Entity record) {
        return repository.save(record);
    }
}
