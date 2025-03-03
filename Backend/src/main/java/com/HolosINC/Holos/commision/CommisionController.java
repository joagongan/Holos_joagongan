package com.HolosINC.Holos.commision;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/v1/commisions")
@Tag(name = "Commision Controller", description = "API for managing Commisions")

public class CommisionController {

    private final CommisionService commisionService;

    @Autowired
    public CommisionController(CommisionService commisionService) {
        this.commisionService = commisionService;
    }

    @PostMapping
    public ResponseEntity<Commision> createCommision(@RequestBody Commision commision) {
        Commision createdCommision = commisionService.createCommision(commision);
        return ResponseEntity.ok(createdCommision);
    }

    @GetMapping
    public ResponseEntity<List<Commision>> getAllCommisions() {
        List<Commision> commisions = commisionService.getAllCommisions();
        return ResponseEntity.ok(commisions);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Commision> getCommisionById(@PathVariable Long id) {
        Commision commision = commisionService.getCommisionById(id);
        return commision != null ? ResponseEntity.ok(commision) : ResponseEntity.notFound().build();
    }
}
