package com.HolosINC.Holos.client;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ClientRepository extends JpaRepository<Client, Long> {

    @Query("SELECT TRUE FROM clients WHERE id = :id")
    boolean isClient(Long id);
}
