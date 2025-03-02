package com.HolosINC.Holos.artist;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ArtistRepository extends JpaRepository<Artist, Integer> {

    @Query("SELECT a FROM Artist a WHERE LOWER(a.baseUser.name) LIKE LOWER(CONCAT('%', :query, '%'))")
    Page<Artist> searchByName(@Param("query") String query, Pageable pageable);
    
    @Query("SELECT a FROM Artist a WHERE LOWER(a.baseUser.username) LIKE LOWER(CONCAT('%', :query, '%'))")
    Page<Artist> searchByUsername(@Param("query") String query, Pageable pageable);

    @Query("SELECT a FROM Artist a WHERE LOWER(a.baseUser.email) LIKE LOWER(CONCAT('%', :query, '%'))")
    Page<Artist> searchByEmail(@Param("query") String query, Pageable pageable);

    @Query("SELECT a FROM Artist a WHERE a.numSlotsOfWork >= :minWorksDone")
    Page<Artist> searchByMinWorks(@Param("minWorksDone") Integer minWorksDone, Pageable pageable);

}
