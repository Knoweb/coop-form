package com.coop.backend.repository;

import com.coop.backend.model.TelephoneRegisterEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TelephoneRegisterRepository extends JpaRepository<TelephoneRegisterEntity, Long> {
}
