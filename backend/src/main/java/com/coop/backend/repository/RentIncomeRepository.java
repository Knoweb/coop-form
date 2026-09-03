package com.coop.backend.repository;

import com.coop.backend.model.RentIncomeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RentIncomeRepository extends JpaRepository<RentIncomeEntity, Long> {
}
