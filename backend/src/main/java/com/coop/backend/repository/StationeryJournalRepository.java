package com.coop.backend.repository;

import com.coop.backend.model.StationeryJournalEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StationeryJournalRepository extends JpaRepository<StationeryJournalEntity, Long> {
}
