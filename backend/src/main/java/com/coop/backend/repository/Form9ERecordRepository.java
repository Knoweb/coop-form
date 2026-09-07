package com.coop.backend.repository;

import com.coop.backend.model.Form9ERecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Form9ERecordRepository extends JpaRepository<Form9ERecord, Long> {
}
