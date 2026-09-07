package com.coop.backend.repository;

import com.coop.backend.model.Form30Record;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Form30RecordRepository extends JpaRepository<Form30Record, Long> {
}
