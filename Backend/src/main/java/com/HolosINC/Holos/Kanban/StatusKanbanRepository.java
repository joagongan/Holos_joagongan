package com.HolosINC.Holos.Kanban;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface StatusKanbanRepository extends JpaRepository<StatusKanban, Long>{
    
    @Query("SELECT s FROM StatusKanban s WHERE s.name = :name")
    Optional<StatusKanban> findByName(String name);
}
