package com.HolosINC.Holos.Kanban;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StatusKanbanOrderRepository extends JpaRepository<StatusKanbanOrder, Long> {
    List<StatusKanbanOrder> findByStatusKanbanId(Long statusKanbanId);
    Optional<StatusKanbanOrder> findByOrder(Integer order);
    List<StatusKanbanOrder> findByStatusKanbanIdOrderByOrderAsc(Long statusKanbanId);

}

