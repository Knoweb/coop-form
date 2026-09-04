package com.coop.backend.repository;

import com.coop.backend.model.Form16BEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Form16BRepository extends JpaRepository<Form16BEntity, Long> {
}
