package com.coop.backend.repository;

import com.coop.backend.model.PettyCashRecordForm2;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PettyCashRecordForm2Repository extends JpaRepository<PettyCashRecordForm2, Long> {
}