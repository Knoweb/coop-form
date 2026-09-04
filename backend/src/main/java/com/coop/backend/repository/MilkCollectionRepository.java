package com.coop.backend.repository;

import com.coop.backend.model.MilkCollectionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MilkCollectionRepository extends JpaRepository<MilkCollectionEntity, Long> {
}
