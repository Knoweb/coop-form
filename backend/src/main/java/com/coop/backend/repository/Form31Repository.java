package com.coop.backend.repository;

import com.coop.backend.model.Form31Record;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Form31Repository extends JpaRepository<Form31Record, Long> {
}
