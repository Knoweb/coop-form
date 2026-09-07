package com.coop.backend.repository;

import com.coop.backend.model.Form32Record;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface Form32Repository extends JpaRepository<Form32Record, Long> {
    List<Form32Record> findByCategory(String category);
}
