package com.HolosINC.Holos.Kanban;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/status-kanban-order")
public class StatusKanbanOrderController {

    @Autowired
    private StatusKanbanOrderService statusKanbanOrderService;

    @PostMapping
    public StatusKanbanOrder createStatusKanbanOrder(@RequestBody StatusKanbanOrder statusKanbanOrder) {
        return statusKanbanOrderService.createStatusKanbanOrder(statusKanbanOrder);
    }

    @PutMapping("/update")
    public StatusKanbanOrder updateStatusKanbanOrder(@RequestBody StatusKanbanOrder statusKanbanOrder) {
        return statusKanbanOrderService.updateStatusKanbanOrder(statusKanbanOrder);
    }

    @DeleteMapping("/{id}")
    public void deleteStatusKanbanOrder(@PathVariable Long id) {
        statusKanbanOrderService.deleteStatusKanbanOrder(id);
    }
}
