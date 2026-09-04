package com.coop.backend.controller;

import com.coop.backend.model.Form16BEntity;
import com.coop.backend.repository.Form16BRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/form-16b")
public class Form16BController {

    @Autowired
    private Form16BRepository repository;

    @GetMapping
    public List<Form16BEntity> getAllRecords() {
        return repository.findAll();
    }

    @PostMapping
    public Form16BEntity createRecord(@RequestBody Form16BEntity record) {
        return repository.save(record);
    }
}
