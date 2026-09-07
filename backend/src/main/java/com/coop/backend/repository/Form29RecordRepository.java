package com.coop.backend.repository;

import com.coop.backend.model.Form29Record;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Form29RecordRepository extends JpaRepository<Form29Record, Long> {
}
