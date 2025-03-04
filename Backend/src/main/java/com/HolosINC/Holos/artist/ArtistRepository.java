package com.HolosINC.Holos.artist;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ArtistRepository extends JpaRepository<Artist, Long> {

    @Query("SELECT TRUE FROM clients WHERE id = :id")
    boolean isArtist(Long id);
}
