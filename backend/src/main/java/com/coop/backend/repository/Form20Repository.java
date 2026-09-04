package com.coop.backend.repository;

import com.coop.backend.model.Form20Entity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Form20Repository extends JpaRepository<Form20Entity, Long> {
}
