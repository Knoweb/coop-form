package com.coop.backend.controller;

import com.coop.backend.model.BranchProfitLossEntity;
import com.coop.backend.repository.BranchProfitLossRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/branch-profit-loss")
public class BranchProfitLossController {

    @Autowired
    private BranchProfitLossRepository repository;

    @GetMapping
    public List<BranchProfitLossEntity> getAllRecords() {
        return repository.findAll();
    }

    @PostMapping
    public BranchProfitLossEntity createRecord(@RequestBody BranchProfitLossEntity record) {
        return repository.save(record);
    }
}
