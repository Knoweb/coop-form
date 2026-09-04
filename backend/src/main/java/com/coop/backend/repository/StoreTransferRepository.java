package com.coop.backend.repository;

import com.coop.backend.model.StoreTransferEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StoreTransferRepository extends JpaRepository<StoreTransferEntity, Long> {
}
