package com.coop.backend.repository;

import com.coop.backend.model.Form32AEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Form32ARepository extends JpaRepository<Form32AEntity, Long> {
}
