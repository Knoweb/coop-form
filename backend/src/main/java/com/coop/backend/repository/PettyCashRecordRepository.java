package com.coop.backend.repository;

import com.coop.backend.model.PettyCashRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PettyCashRecordRepository extends JpaRepository<PettyCashRecord, Long> {
}
