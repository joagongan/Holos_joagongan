package com.HolosINC.Holos.worksdone;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.HolosINC.Holos.artist.Artist;

@Service
public class WorksDoneService {

    private final WorksDoneRepository worksDoneRepository;

    public WorksDoneService(WorksDoneRepository worksDoneRepository) {
        this.worksDoneRepository = worksDoneRepository;
    }

    public WorksDone createWorksDone(WorksDone worksDone) {
        return worksDoneRepository.save(worksDone);
    }

    public List<WorksDone> getAllWorksDone() {
        return worksDoneRepository.findAll();
    }

    public WorksDone getWorksDoneById(Long id) {
        return worksDoneRepository.findById(id).orElse(null);
    }

    public List<WorksDone> getWorksDoneByArtist(Artist artist) {
        return worksDoneRepository.findAll().stream().filter(work -> work.getArtist().equals(artist))
                .collect(Collectors.toList());
    }
}
