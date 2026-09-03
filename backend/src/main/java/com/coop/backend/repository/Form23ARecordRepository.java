package com.coop.backend.repository;

import com.coop.backend.model.Form23ARecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Form23ARecordRepository extends JpaRepository<Form23ARecord, Long> {
}
