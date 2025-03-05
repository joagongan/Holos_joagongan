package com.HolosINC.Holos.Kanban;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/status-kanban")
public class StatusKanbanController {

    @Autowired
    private StatusKanbanService statusKanbanService;

    @PostMapping
    public StatusKanban createStatusKanban(@RequestParam String name) {
        return statusKanbanService.createStatusKanban(name);
    }

    @DeleteMapping("/{id}")
    public void deleteStatusKanban(@PathVariable Long id) {
        statusKanbanService.deleteStatusKanban(id);
    }
}
