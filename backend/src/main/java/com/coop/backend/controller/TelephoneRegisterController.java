package com.coop.backend.controller;

import com.coop.backend.model.TelephoneRegisterEntity;
import com.coop.backend.repository.TelephoneRegisterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/telephone-register")
public class TelephoneRegisterController {

    @Autowired
    private TelephoneRegisterRepository repository;

    @GetMapping
    public List<TelephoneRegisterEntity> getAllRecords() {
        return repository.findAll();
    }

    @PostMapping
    public TelephoneRegisterEntity createRecord(@RequestBody TelephoneRegisterEntity record) {
        return repository.save(record);
    }
}
