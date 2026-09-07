package com.coop.backend.repository;

import com.coop.backend.model.Form17Entity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Form17Repository extends JpaRepository<Form17Entity, Long> {
}
