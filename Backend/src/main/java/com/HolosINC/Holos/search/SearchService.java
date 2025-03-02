package com.HolosINC.Holos.search;

import com.HolosINC.Holos.artist.Artist;
import com.HolosINC.Holos.artist.ArtistRepository;
import com.HolosINC.Holos.work.Work;
import com.HolosINC.Holos.work.WorkRepository;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class SearchService {

    private final ArtistRepository artistRepository;
    private final WorkRepository workRepository;

    @Autowired
    public SearchService(ArtistRepository artistRepository, WorkRepository workRepository) {
        this.artistRepository = artistRepository;
        this.workRepository = workRepository;
    }

    public Page<Work> searchWorks(String query, Double minPrice, Double maxPrice, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);

        if (query != null) {
            return workRepository.searchByTitle(query, pageable);
        } 
        if (minPrice != null || maxPrice != null) {
            return workRepository.searchByPriceRange(minPrice, maxPrice, pageable);
        }
        return workRepository.findAll(pageable);
    }

    public Page<Artist> searchArtists(String query, Integer minWorksDone, int page, int size) {
    Pageable pageable = PageRequest.of(page, size);

    if (query != null) {
        Page<Artist> byName = artistRepository.searchByName(query, pageable);
        Page<Artist> byUsername = artistRepository.searchByUsername(query, pageable);
        Page<Artist> byEmail = artistRepository.searchByEmail(query, pageable);

        List<Artist> combinedResults = Stream.concat(
                Stream.concat(byName.getContent().stream(), byUsername.getContent().stream()),
                byEmail.getContent().stream()
        ).distinct().collect(Collectors.toList());

        return new PageImpl<>(combinedResults, pageable, combinedResults.size());
    }

    if (minWorksDone != null) {
        return artistRepository.searchByMinWorks(minWorksDone, pageable);
    }

    return artistRepository.findAll(pageable);
}


    public Page<Work> searchWorksByArtist(Integer artistId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return workRepository.searchByArtist(artistId, pageable);
    }

    public Page<Object> searchAll(String query, Integer minWorksDone, Double minPrice, Double maxPrice, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);

        Page<Work> works = searchWorks(query, minPrice, maxPrice, page, size);
        
        Page<Artist> artists = searchArtists(query, minWorksDone, page, size);

        List<Object> combinedResults = Stream.concat(artists.getContent().stream(), works.getContent().stream())
                .collect(Collectors.toList());

        return new PageImpl<>(combinedResults, pageable, combinedResults.size());
    }
}
