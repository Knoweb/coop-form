package com.coop.backend.repository;

import com.coop.backend.model.Form21BEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Form21BRepository extends JpaRepository<Form21BEntity, Long> {
}
