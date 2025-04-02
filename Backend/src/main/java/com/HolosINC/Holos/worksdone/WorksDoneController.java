package com.HolosINC.Holos.worksdone;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.HolosINC.Holos.artist.Artist;
import com.HolosINC.Holos.artist.ArtistService;
import com.HolosINC.Holos.util.RestPreconditions;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/v1/worksdone")
@SecurityRequirement(name = "bearerAuth")
@Tag(name = "WorksDone Controller", description = "API for managing WorksDone")
public class WorksDoneController {

    private final WorksDoneService worksDoneService;
    private final ArtistService artistService;

    @Autowired
    public WorksDoneController(WorksDoneService worksDoneService, ArtistService artistService) {
        this.worksDoneService = worksDoneService;
        this.artistService = artistService;
    }

    @PostMapping
    public ResponseEntity<WorksDone> createWorksDone(@RequestBody WorksDone worksDone) {
        WorksDone createdWork = worksDoneService.createWorksDone(worksDone);
        return ResponseEntity.ok(createdWork);
    }

    // TODO:  
    @GetMapping
    public ResponseEntity<List<WorksDoneDTO>> getAllWorksDone() {
        try {
            List<WorksDoneDTO> worksDoneDTOs = worksDoneService.getAllWorksDone()
                    .stream()
                    .map(work -> WorksDoneDTO.builder()
                            .id(work.getId())
                            .name(work.getName())
                            .description(work.getDescription())
                            .price(work.getPrice())
                            .image(work.getImage())
                            .artistId(work.getArtist().getId())
                            .artistName(work.getArtist().getBaseUser().getName())
                            .artistSurname(work.getArtist().getBaseUser().getUsername())
                            .build())
                    .toList();
            return ResponseEntity.ok(worksDoneDTOs);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    // TODO:  
    @GetMapping("/{id}")
    public ResponseEntity<WorksDoneDTO> getWorksDoneById(@PathVariable Long id) {
        try {
            WorksDone worksDone = worksDoneService.getWorksDoneById(id);
            WorksDoneDTO workDoneDTO = WorksDoneDTO.builder()
                    .id(worksDone.getId())
                    .name(worksDone.getName())
                    .description(worksDone.getDescription())
                    .price(worksDone.getPrice())
                    .image(worksDone.getImage())
                    .artistId(worksDone.getArtist().getId())
                    .artistName(worksDone.getArtist().getBaseUser().getName())
                    .artistSurname(worksDone.getArtist().getBaseUser().getUsername())
                    .build();
            return worksDone != null ? ResponseEntity.ok(workDoneDTO) : ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    // TODO:    
    @GetMapping("/artist/{username}")
    public ResponseEntity<List<WorksDoneDTO>> getWorksDoneByArtist(@PathVariable String username) {
        try {
            Artist artist = artistService.findArtistByUsername(username);
            List<WorksDoneDTO> worksDoneDTOs = worksDoneService.getWorksDoneByArtist(artist).stream()
                    .map(work -> WorksDoneDTO.builder()
                            .id(work.getId())
                            .name(work.getName())
                            .description(work.getDescription())
                            .price(work.getPrice())
                            .image(work.getImage())
                            .artistId(work.getArtist().getId())
                            .artistName(work.getArtist().getBaseUser().getName())
                            .artistSurname(work.getArtist().getBaseUser().getUsername())
                            .build())
                    .toList();
            return ResponseEntity.ok(worksDoneDTOs);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @PutMapping(value = "/artist/{artistId}/{worksDoneId}")
    public ResponseEntity<WorksDone> updateWorksDone(@PathVariable("worksDoneId") Long worksDoneId, 
        @PathVariable("artistId") Long artistId,
        @RequestBody @Valid WorksDone worksDone) {

        RestPreconditions.checkNotNull(worksDoneService.getWorksDoneById(worksDoneId), "WorksDone", "ID", worksDoneId);

        return new ResponseEntity<>(worksDoneService.updateWorksDone(worksDone, worksDoneId, artistId), HttpStatus.OK);
    }

}
