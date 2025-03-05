package com.HolosINC.Holos.Kanban;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface StatusKanbanOrderRepository extends JpaRepository<StatusKanbanOrder, Long> {

    @Query("SELECT s FROM StatusKanbanOrder s WHERE s.order = :order")
    Optional<StatusKanbanOrder> findByOrder(Integer order);

    @Query("SELECT s FROM StatusKanbanOrder s WHERE s.order = :order AND s.artist.id = :id")
    List<StatusKanbanOrder> findByOrderAndArtist(Integer order, Long id);
}

