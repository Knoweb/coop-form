package com.coop.backend.repository;

import com.coop.backend.model.GeneralLedgerEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GeneralLedgerRepository extends JpaRepository<GeneralLedgerEntity, Long> {
}
