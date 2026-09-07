package com.coop.backend.repository;

import com.coop.backend.model.Form9DRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Form9DRecordRepository extends JpaRepository<Form9DRecord, Long> {
}
