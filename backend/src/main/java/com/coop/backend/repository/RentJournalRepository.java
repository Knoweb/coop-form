package com.coop.backend.repository;

import com.coop.backend.model.RentJournalEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RentJournalRepository extends JpaRepository<RentJournalEntity, Long> {
}
