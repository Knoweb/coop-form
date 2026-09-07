package com.coop.backend.repository;

import com.coop.backend.model.Form16AEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Form16ARepository extends JpaRepository<Form16AEntity, Long> {
}
