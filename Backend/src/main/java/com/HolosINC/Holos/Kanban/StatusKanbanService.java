package com.HolosINC.Holos.Kanban;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class StatusKanbanService {

    private StatusKanbanRepository statusKanbanRepository;

    @Autowired
    public StatusKanbanService(StatusKanbanRepository statusKanbanRepository) {
        this.statusKanbanRepository = statusKanbanRepository;
    }
    
    public StatusKanban createStatusKanban(String name) {
        if (statusKanbanRepository.findByName(name).isPresent()) {
            throw new IllegalArgumentException("El estado ya existe.");
        }
        StatusKanban statusKanban = new StatusKanban();
        statusKanban.setName(name);
        return statusKanbanRepository.save(statusKanban);
    }

    public void deleteStatusKanban(Long id) {
        statusKanbanRepository.deleteById(id);
    }
}
