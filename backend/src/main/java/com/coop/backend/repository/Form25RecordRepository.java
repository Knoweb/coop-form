package com.coop.backend.repository;

import com.coop.backend.model.Form25Record;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Form25RecordRepository extends JpaRepository<Form25Record, Long> {
}
