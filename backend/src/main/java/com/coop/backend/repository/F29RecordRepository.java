package com.coop.backend.repository;

import com.coop.backend.model.F29Record;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface F29RecordRepository extends JpaRepository<F29Record, Long> {
}
