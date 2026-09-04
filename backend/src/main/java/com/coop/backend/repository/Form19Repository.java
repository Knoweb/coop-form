package com.coop.backend.repository;

import com.coop.backend.model.Form19Entity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Form19Repository extends JpaRepository<Form19Entity, Long> {
}
