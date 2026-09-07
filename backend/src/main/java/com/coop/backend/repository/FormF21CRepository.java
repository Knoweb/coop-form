package com.coop.backend.repository;

import com.coop.backend.model.FormF21CEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FormF21CRepository extends JpaRepository<FormF21CEntity, Long> {
}
