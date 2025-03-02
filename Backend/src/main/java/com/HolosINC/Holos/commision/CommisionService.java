package com.HolosINC.Holos.commision;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class CommisionService {
    
    private final CommisionRepository commisionRepository;

    public CommisionService(CommisionRepository commisionRepository){
        this.commisionRepository = commisionRepository;
    }

    public Commision createCommision(Commision commision) {
        return commisionRepository.save(commision);
    }

    public List<Commision> getAllCommisions() {
        return commisionRepository.findAll();
    }

    public Commision getCommisionById(Long id) {
        return commisionRepository.findById(id).orElse(null);
    }
}
