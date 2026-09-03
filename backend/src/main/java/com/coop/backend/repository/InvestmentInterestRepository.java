package com.coop.backend.repository;

import com.coop.backend.model.InvestmentInterestEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InvestmentInterestRepository extends JpaRepository<InvestmentInterestEntity, Long> {
}
