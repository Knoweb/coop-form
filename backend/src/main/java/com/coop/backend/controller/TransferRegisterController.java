package com.coop.backend.controller;

import com.coop.backend.model.TransferRegisterEntity;
import com.coop.backend.repository.TransferRegisterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transfer-register")
public class TransferRegisterController {

    @Autowired
    private TransferRegisterRepository repository;

    @GetMapping
    public List<TransferRegisterEntity> getAllRecords() {
        return repository.findAll();
    }

    @PostMapping
    public TransferRegisterEntity saveRecord(@RequestBody TransferRegisterEntity record) {
        return repository.save(record);
    }
}
