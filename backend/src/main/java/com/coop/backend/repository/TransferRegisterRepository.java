package com.coop.backend.repository;

import com.coop.backend.model.TransferRegisterEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TransferRegisterRepository extends JpaRepository<TransferRegisterEntity, Long> {
}
