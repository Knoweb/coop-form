package com.coop.backend.controller;

import com.coop.backend.model.Schedule2Entity;
import com.coop.backend.repository.Schedule2Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/schedule2")
public class Schedule2Controller {

    @Autowired
    private Schedule2Repository schedule2Repository;

    @GetMapping
    public List<Schedule2Entity> getAllRecords() {
        return schedule2Repository.findAll();
    }

    @PostMapping
    public Schedule2Entity saveRecord(@RequestBody Schedule2Entity record) {
        return schedule2Repository.save(record);
    }
}
