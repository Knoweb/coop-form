package com.coop.backend.repository;

import com.coop.backend.model.BranchProfitLossEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BranchProfitLossRepository extends JpaRepository<BranchProfitLossEntity, Long> {
}
