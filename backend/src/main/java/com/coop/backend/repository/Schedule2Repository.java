package com.coop.backend.repository;

import com.coop.backend.model.Schedule2Entity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Schedule2Repository extends JpaRepository<Schedule2Entity, Long> {
}
