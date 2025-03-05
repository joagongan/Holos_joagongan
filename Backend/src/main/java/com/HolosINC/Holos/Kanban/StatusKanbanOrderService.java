package com.HolosINC.Holos.Kanban;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StatusKanbanOrderService {

    private StatusKanbanOrderRepository statusKanbanOrderRepository;

    @Autowired
    public StatusKanbanOrderService(StatusKanbanOrderRepository statusKanbanOrderRepository) {
        this.statusKanbanOrderRepository = statusKanbanOrderRepository;
    }

    public StatusKanbanOrder createStatusKanbanOrder(StatusKanbanOrder statusKanbanOrder) {
        return statusKanbanOrderRepository.save(statusKanbanOrder);
    }

    public StatusKanbanOrder updateStatusKanbanOrder(StatusKanbanOrder statusKanbanOrder) {
        return statusKanbanOrderRepository.save(statusKanbanOrder);
    }

    public void deleteStatusKanbanOrder(Long id) {
        statusKanbanOrderRepository.deleteById(id);
    }

    // TODO: updateOrder
}
