package com.HolosINC.Holos.worksdone;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.HolosINC.Holos.artist.Artist;
import com.HolosINC.Holos.artist.ArtistService;
import com.HolosINC.Holos.exceptions.ResourceNotFoundException;

@Service
public class WorksDoneService {

    private final WorksDoneRepository worksDoneRepository;
    private final ArtistService artistService;

    public WorksDoneService(WorksDoneRepository worksDoneRepository, ArtistService artistService ) {
        this.worksDoneRepository = worksDoneRepository;
        this.artistService = artistService;
    }

    public WorksDone createWorksDone(WorksDone worksDone) {
        return worksDoneRepository.save(worksDone);
    }

    // TODO: this method has no exception handling because a non logged person shoud see works done
    public List<WorksDone> getAllWorksDone() {
        return worksDoneRepository.findAll();
    }

    @Transactional
    public WorksDone updateWorksDone(WorksDone worksDone, Long worksDoneId, Long artistId) {
        Artist artist = artistService.findArtist(artistId);

        WorksDone worksDoneToUpdate = worksDoneRepository.findById(worksDoneId)
                .orElseThrow(() -> new ResourceNotFoundException("WorksDone", "id", worksDoneId));

        if (!worksDoneToUpdate.getArtist().getId().equals(artist.getId())) {
            throw new IllegalArgumentException("El artista no tiene permisos para modificar este trabajo.");
        }

        BeanUtils.copyProperties(worksDone, worksDoneToUpdate, "id");
        return worksDoneRepository.save(worksDoneToUpdate);
    }

    // TODO: this method has no exception handling because a non logged person shoud see works done
    public WorksDone getWorksDoneById(Long id) {
        return worksDoneRepository.findById(id).orElse(null);
    }

    // TODO: this method has no exception handling because a non logged person shoud see works done
    public List<WorksDone> getWorksDoneByArtist(Artist artist) {
        return worksDoneRepository.findAll().stream().filter(work -> work.getArtist().equals(artist))
                .collect(Collectors.toList());
    }
}
