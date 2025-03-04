package com.HolosINC.Holos.Category;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ArtistCategoryRepository extends JpaRepository<ArtistCategory, Long> {
    

    @Query("SELECT CASE WHEN COUNT(ac) > 0 THEN TRUE ELSE FALSE END FROM ArtistCategory ac WHERE ac.artist.id = ?1 AND ac.category.id = ?2")
    Boolean artistCategoryExist(Long artistId, Long categoryId);

    @Query("SELECT ac FROM ArtistCategory ac WHERE ac.artist.id = ?1")
    List<ArtistCategory> findArtistCategoryByArtist(Long artistId);

    @Query("SELECT ac FROM ArtistCategory ac WHERE ac.category.id = ?1")
    List<ArtistCategory> findByCategory(Long categoryId);

    @Query("SELECT ac FROM ArtistCategory ac WHERE ac.category.name = ?1")
    List<ArtistCategory> findByCategoryName(String categoryName);

    @Query("SELECT ac FROM ArtistCategory ac WHERE ac.artist.id = ?1 AND ac.category.id = ?2")
    List<ArtistCategory> findByArtistAndCategory(Long artistId, Long categoryId);
}
