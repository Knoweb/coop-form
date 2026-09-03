package com.coop.backend.repository;

import com.coop.backend.model.Form9CRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Form9CRecordRepository extends JpaRepository<Form9CRecord, Long> {
}
