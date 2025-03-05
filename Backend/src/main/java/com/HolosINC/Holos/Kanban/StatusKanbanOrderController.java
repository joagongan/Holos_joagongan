package com.HolosINC.Holos.Kanban;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/status-kanban-order")
public class StatusKanbanOrderController {

    @Autowired
    private StatusKanbanOrderService statusKanbanOrderService;

    @PostMapping
    public StatusKanbanOrder createStatusKanbanOrder(
            @RequestParam Long statusKanbanId,
            @RequestParam Integer order,
            @RequestParam String description,
            @RequestParam String color) {
        return statusKanbanOrderService.createStatusKanbanOrder(statusKanbanId, order, description, color);
    }

    @PutMapping("/{id}")
    public void updateStatusKanbanOrder(
            @PathVariable Long id,
            @RequestParam String description,
            @RequestParam String color) {
        statusKanbanOrderService.updateStatusKanbanOrder(id, description, color);
    }

    @DeleteMapping("/{id}")
    public void deleteStatusKanbanOrder(@PathVariable Long id) {
        statusKanbanOrderService.deleteStatusKanbanOrder(id);
    }

    @PutMapping("/{id}/order")
    public void updateOrder(@PathVariable Long id, @RequestParam Integer newOrder) {
        statusKanbanOrderService.updateOrder(id, newOrder);
    }
}
