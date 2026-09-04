package com.coop.backend.repository;

import com.coop.backend.model.Form21AEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Form21ARepository extends JpaRepository<Form21AEntity, Long> {
}
