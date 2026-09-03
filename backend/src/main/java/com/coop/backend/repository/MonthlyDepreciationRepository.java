package com.coop.backend.repository;

import com.coop.backend.model.MonthlyDepreciationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MonthlyDepreciationRepository extends JpaRepository<MonthlyDepreciationEntity, Long> {
}
