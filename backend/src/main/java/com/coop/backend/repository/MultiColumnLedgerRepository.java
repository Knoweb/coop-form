package com.coop.backend.repository;

import com.coop.backend.model.MultiColumnLedgerEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MultiColumnLedgerRepository extends JpaRepository<MultiColumnLedgerEntity, Long> {
}
