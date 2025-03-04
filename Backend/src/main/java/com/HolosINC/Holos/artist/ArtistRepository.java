package com.HolosINC.Holos.artist;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ArtistRepository extends JpaRepository<Artist, Integer> {

    @Query("SELECT a FROM Artist a WHERE LOWER(a.baseUser.name) LIKE LOWER(CONCAT('%', :query, '%'))")
    Page<Artist> searchByName(String query, Pageable pageable);

    @Query("SELECT a FROM Artist a WHERE LOWER(a.baseUser.username) LIKE LOWER(CONCAT('%', :query, '%'))")
    Page<Artist> searchByUsername(String query, Pageable pageable);

    @Query("SELECT a FROM Artist a WHERE LOWER(a.baseUser.email) LIKE LOWER(CONCAT('%', :query, '%'))")
    Page<Artist> searchByEmail(String query, Pageable pageable);

    @Query("SELECT a FROM Artist a WHERE a.numSlotsOfWork >= :minWorks")
    Page<Artist> searchByMinWorks(Integer minWorks, Pageable pageable);

    @Query("SELECT a FROM Artist a WHERE (LOWER(a.baseUser.name) LIKE LOWER(CONCAT('%', :query, '%')) " +
       "OR LOWER(a.baseUser.username) LIKE LOWER(CONCAT('%', :query, '%')) " +
       "OR LOWER(a.baseUser.email) LIKE LOWER(CONCAT('%', :query, '%'))) " +
       "AND (:minWorksDone IS NULL OR a.numSlotsOfWork >= :minWorksDone)")
    Page<Artist> searchByNameAndWorksDone(String query, Integer minWorksDone, Pageable pageable);


}
