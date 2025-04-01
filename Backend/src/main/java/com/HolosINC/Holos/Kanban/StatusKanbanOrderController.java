package com.HolosINC.Holos.Kanban;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.util.Pair;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.HolosINC.Holos.Kanban.DTOs.StatusKanbanCreateDTO;
import com.HolosINC.Holos.Kanban.DTOs.StatusKanbanDTO;
import com.HolosINC.Holos.Kanban.DTOs.StatusKanbanWithCommisionsDTO;
import com.HolosINC.Holos.artist.ArtistService;
import com.HolosINC.Holos.commision.Commision;
import com.HolosINC.Holos.exceptions.ResourceNotFoundException;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/v1/status-kanban-order")
@SecurityRequirement(name = "bearerAuth")
@Tag(name = "Status Kanban", description = "API for controlling the usage of the kanban")
public class StatusKanbanOrderController {

    private final StatusKanbanOrderService statusKanbanOrderService;
    private final ArtistService artistService;

    @Autowired
	public StatusKanbanOrderController(StatusKanbanOrderService statusKanbanOrderService, ArtistService artistService) {
		this.statusKanbanOrderService = statusKanbanOrderService;
        this.artistService = artistService;
	}

    @PostMapping
    public ResponseEntity<?> addStatusToKanban(@Valid @RequestBody StatusKanbanCreateDTO dto) {
        try {
            statusKanbanOrderService.addStatusToKanban(
                dto.getColor(),
                dto.getDescription(),
                dto.getNombre()
            );
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity
                    .badRequest()
                    .body("Ya existe un estado con ese nombre para este artista.");
        } catch (Exception e) {
            return ResponseEntity
                    .badRequest()
                    .body("No se pudo crear el estado Kanban: " + e.getMessage());
        }
    }


    @PutMapping("/update")
    public StatusKanbanOrder updateStatusKanbanOrder(@RequestBody StatusKanbanOrder statusKanbanOrder) {
        return statusKanbanOrderService.updateStatusKanbanOrder(statusKanbanOrder);
    }

    //Cambiar color o descripción ¿Añadir nombre?

    @PutMapping("/{id}/updateKanban")
    public ResponseEntity<StatusKanbanOrder> updateKanban(@RequestBody StatusKanbanOrder sk) {
        Integer id = sk.getId().intValue();
        String color = sk.getColor();
        String nombre = sk.getName();
        String description = sk.getDescription();

        StatusKanbanOrder sk2 = statusKanbanOrderService.updateKanban(id, color, description, nombre);
        return new ResponseEntity<>(sk2, HttpStatus.OK);
    }

    @PutMapping("/{id}/updateKanbanOrder")
    public ResponseEntity<StatusKanbanOrder> updateOrder(@PathVariable Long id, @RequestBody Integer order) {
        StatusKanbanOrder sk2 = statusKanbanOrderService.updateOrder(id, order);
        return new ResponseEntity<>(sk2, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public void deleteStatusKanbanOrder(@PathVariable Integer id) {
        statusKanbanOrderService.deleteStatusKanbanOrder(id);
    }

    @GetMapping
    public ResponseEntity<?> getAllStatusKanbanOrder() {
        try {
            Pair<List<StatusKanbanDTO>,List<StatusKanbanWithCommisionsDTO>> allStatus = statusKanbanOrderService.getAllStatusFromArtist();
            return ResponseEntity.ok().body(allStatus);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.badRequest().body(e);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Something weird happend. See the following:\n" + e.getMessage());
        }
    }

    @PutMapping("/{id}/next")
    public ResponseEntity<?> updateToNextStatusTheCommision(@PathVariable Long id) {
        try {
            Commision c = statusKanbanOrderService.nextStatusOfCommision(id);
            return ResponseEntity.ok().body(c);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.badRequest().body(e);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Something weird happend. See the following:\n" + e.getMessage());
        }
    }

    @PutMapping("/{id}/previous")
    public ResponseEntity<?> updateToPreviousStatusTheCommision(@PathVariable Long id) {
        try {
            Commision c = statusKanbanOrderService.previousStatusOfCommision(id);
            return ResponseEntity.ok().body(c);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.badRequest().body(e);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Something weird happend. See the following:\n" + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getStatusKanbanOrder(@PathVariable Integer id) {
        try {
            return ResponseEntity.ok().body(statusKanbanOrderService.findStatusKanbanOrder(id));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.badRequest().body(e);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Something weird happend. See the following:\n" + e.getMessage());
        }
    }
}
