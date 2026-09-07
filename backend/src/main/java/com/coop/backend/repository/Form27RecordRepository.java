package com.coop.backend.repository;

import com.coop.backend.model.Form27Record;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Form27RecordRepository extends JpaRepository<Form27Record, Long> {
}
