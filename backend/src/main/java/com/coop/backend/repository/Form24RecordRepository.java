package com.coop.backend.repository;

import com.coop.backend.model.Form24Record;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Form24RecordRepository extends JpaRepository<Form24Record, Long> {
}
