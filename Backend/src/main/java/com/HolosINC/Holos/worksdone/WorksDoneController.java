package com.HolosINC.Holos.worksdone;

import java.io.IOException;
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
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.HolosINC.Holos.artist.Artist;
import com.HolosINC.Holos.artist.ArtistService;
import com.HolosINC.Holos.model.BaseUserService;
import com.HolosINC.Holos.util.RestPreconditions;
import com.fasterxml.jackson.databind.ObjectMapper;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/v1/worksdone")
@SecurityRequirement(name = "bearerAuth")
@Tag(name = "WorksDone Controller", description = "API for managing WorksDone")
public class WorksDoneController {

    private final WorksDoneService worksDoneService;
    private final ArtistService artistService;
    private final BaseUserService baseUserService;

    @Autowired
    public WorksDoneController(WorksDoneService worksDoneService, ArtistService artistService,
            BaseUserService baseUserService) {
        this.worksDoneService = worksDoneService;
        this.artistService = artistService;
        this.baseUserService = baseUserService;
    }

    @PostMapping(consumes = { "multipart/form-data" })
    public ResponseEntity<WorksDoneDTO> createWorksDone(
            @RequestPart("work") String workJson,
            @RequestPart("image") MultipartFile imageFile) throws IOException {

        ObjectMapper mapper = new ObjectMapper();
        WorksDoneDTO dto = mapper.readValue(workJson, WorksDoneDTO.class);

        dto.setImage(imageFile.getBytes());

        Long currentUserId = baseUserService.findCurrentUser().getId();
        Artist artist = baseUserService.findArtist(currentUserId);

        WorksDone work = dto.createWorksDone();
        work.setArtist(artist);

        WorksDone created = worksDoneService.createWorksDone(work);

        return ResponseEntity.ok(WorksDoneDTO.createDTO(created));
    }

    @GetMapping
    public ResponseEntity<List<WorksDoneDTO>> getAllWorksDone() {
        List<WorksDoneDTO> dtos = worksDoneService.getAllWorksDone()
                .stream()
                .map(WorksDoneDTO::createDTO)
                .toList();
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<WorksDone> getWorksDoneById(@PathVariable Long id) {
        WorksDone worksDone = worksDoneService.getWorksDoneById(id);
        return worksDone != null ? ResponseEntity.ok(worksDone) : ResponseEntity.notFound().build();
    }

    @GetMapping("/artist/{artistId}")
    public ResponseEntity<List<WorksDone>> getWorksDoneByArtist(@PathVariable Long artistId) {
        Artist artist = artistService.findArtist(artistId);
        List<WorksDone> works = worksDoneService.getWorksDoneByArtist(artist);
        return ResponseEntity.ok(works);
    }

    @PutMapping(value = "/artist/{artistId}/{worksDoneId}")
    public ResponseEntity<WorksDone> updateWorksDone(@PathVariable("worksDoneId") Long worksDoneId,
            @PathVariable("artistId") Long artistId,
            @RequestBody @Valid WorksDone worksDone) {

        RestPreconditions.checkNotNull(worksDoneService.getWorksDoneById(worksDoneId), "WorksDone", "ID", worksDoneId);

        return new ResponseEntity<>(worksDoneService.updateWorksDone(worksDone, worksDoneId, artistId), HttpStatus.OK);
    }

    @GetMapping("/can-upload")
    public ResponseEntity<Boolean> canUserUploadWork() {
        Long currentUserId = baseUserService.findCurrentUser().getId();
        Artist artist = baseUserService.findArtist(currentUserId);

        boolean isPremium = false;
        long worksCount = worksDoneService.countByArtistId(artist.getId());

        boolean canUpload = isPremium || worksCount <= 7;

        return ResponseEntity.ok(canUpload);
    }

}
