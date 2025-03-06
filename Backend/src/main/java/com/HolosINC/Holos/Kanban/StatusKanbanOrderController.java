package com.HolosINC.Holos.Kanban;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    //Cambiar color o descripción ¿Añadir nombre?

    @PutMapping("/{id}")
    public ResponseEntity<StatusKanbanOrder> updateKanban(@PathVariable("id") int id, @RequestParam String color, @RequestParam String description) {
        StatusKanbanOrder sk = statusKanbanOrderService.updateKanban(id, color, description);
        return new ResponseEntity<>(sk, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<StatusKanbanOrder> updateOrder(@PathVariable("id") int id, @RequestParam Integer order) {
        StatusKanbanOrder sk = statusKanbanOrderService.updateOrder(id, order);
        return new ResponseEntity<>(sk, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public void deleteStatusKanbanOrder(@PathVariable Integer id) {
        statusKanbanOrderService.deleteStatusKanbanOrder(id);
    }

    @GetMapping("/artist/{artistId}")
    public List<StatusKanbanOrder> getStatusKanbanOrderByArtist(@PathVariable Integer artistId) {
        return statusKanbanOrderService.findAllStatusKanbanOrderByArtist(artistId);
    }

    @GetMapping
    public List<StatusKanbanOrder> getAllStatusKanbanOrder() {
        return statusKanbanOrderService.findAllStatusKanbanOrder();
    }

    @GetMapping("/{id}")
    public StatusKanbanOrder getStatusKanbanOrder(@PathVariable Integer id) {
        return statusKanbanOrderService.findStatusKanbanOrder(id);
    }
}
