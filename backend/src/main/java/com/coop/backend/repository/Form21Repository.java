package com.coop.backend.repository;

import com.coop.backend.model.Form21Entity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Form21Repository extends JpaRepository<Form21Entity, Long> {
}
