package com.HolosINC.Holos.Kanban;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class StatusKanbanOrderService {

    private StatusKanbanOrderRepository statusKanbanOrderRepository;
    private StatusKanbanRepository statusKanbanRepository;

    @Autowired
    public StatusKanbanOrderService(StatusKanbanOrderRepository statusKanbanOrderRepository, StatusKanbanRepository statusKanbanRepository) {
        this.statusKanbanOrderRepository = statusKanbanOrderRepository;
        this.statusKanbanRepository = statusKanbanRepository;
    }

    public StatusKanbanOrder createStatusKanbanOrder(Long statusKanbanId, Integer order, String description, String color) {
        Optional<StatusKanban> statusKanbanOpt = statusKanbanRepository.findById(statusKanbanId);
        if (statusKanbanOpt.isEmpty()) {
            throw new IllegalArgumentException("StatusKanban no encontrado.");
        }

        if (statusKanbanOrderRepository.findByOrder(order).isPresent()) {
            throw new IllegalArgumentException("Ya existe un estado con este orden.");
        }

        StatusKanbanOrder statusKanbanOrder = new StatusKanbanOrder();
        statusKanbanOrder.setStatusKanban(statusKanbanOpt.get());
        statusKanbanOrder.setOrder(order);
        statusKanbanOrder.setDescription(description);
        statusKanbanOrder.setColor(color);

        return statusKanbanOrderRepository.save(statusKanbanOrder);
    }

    public void updateStatusKanbanOrder(Long id, String description, String color) {
        StatusKanbanOrder statusKanbanOrder = statusKanbanOrderRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("StatusKanbanOrder no encontrado."));
        
        statusKanbanOrder.setDescription(description);
        statusKanbanOrder.setColor(color);
        
        statusKanbanOrderRepository.save(statusKanbanOrder);
    }

    public void deleteStatusKanbanOrder(Long id) {
        statusKanbanOrderRepository.deleteById(id);
    }

    @Transactional
    public void updateOrder(Long id, Integer newOrder) {
        StatusKanbanOrder statusKanbanOrder = statusKanbanOrderRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("StatusKanbanOrder no encontrado."));

        Integer oldOrder = statusKanbanOrder.getOrder();
        if (oldOrder.equals(newOrder)) {
            return; // No hay cambios
        }

        List<StatusKanbanOrder> allOrders = statusKanbanOrderRepository.findByStatusKanbanIdOrderByOrderAsc(
            statusKanbanOrder.getStatusKanban().getId()
        );

        for (StatusKanbanOrder order : allOrders) {
            if (order.getOrder().equals(newOrder)) {
                order.setOrder(oldOrder);
                statusKanbanOrderRepository.save(order);
                break;
            }
        }

        statusKanbanOrder.setOrder(newOrder);
        statusKanbanOrderRepository.save(statusKanbanOrder);
    }
}
