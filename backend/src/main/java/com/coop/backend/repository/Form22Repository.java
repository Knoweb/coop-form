package com.coop.backend.repository;

import com.coop.backend.model.Form22Entity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Form22Repository extends JpaRepository<Form22Entity, Long> {
}
