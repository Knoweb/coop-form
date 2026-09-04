package com.coop.backend.repository;

import com.coop.backend.model.Form16DEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Form16DRepository extends JpaRepository<Form16DEntity, Long> {
}
