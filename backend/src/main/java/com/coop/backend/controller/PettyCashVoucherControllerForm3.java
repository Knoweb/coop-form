package com.coop.backend.controller;

import com.coop.backend.model.PettyCashVoucherForm3;
import com.coop.backend.repository.PettyCashVoucherForm3Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/form3/vouchers")

public class PettyCashVoucherControllerForm3 {

    @Autowired
    private PettyCashVoucherForm3Repository repository;

    @GetMapping
    public List<PettyCashVoucherForm3> getAllVouchers() {
        return repository.findAll();
    }

    @PostMapping
    public PettyCashVoucherForm3 createVoucher(@RequestBody PettyCashVoucherForm3 voucher) {
        return repository.save(voucher);
    }

    @DeleteMapping("/{id}")
    public void deleteVoucher(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
