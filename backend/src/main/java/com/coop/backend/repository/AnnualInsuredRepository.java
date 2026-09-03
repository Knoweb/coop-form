package com.coop.backend.repository;

import com.coop.backend.model.AnnualInsuredEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AnnualInsuredRepository extends JpaRepository<AnnualInsuredEntity, Long> {
}
