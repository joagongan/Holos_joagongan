package com.HolosINC.Holos.Category;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ArtistCategoryRepository extends JpaRepository<ArtistCategory, Long> {
    

    @Query("SELECT COUNT(ac) > 0 FROM ArtistCategory ac WHERE ac.artist.id = :artistId AND ac.category.id = :categoryId")
    Boolean artistCategoryExist(Long artistId, Long categoryId);

    @Query("SELECT ac.category FROM ArtistCategory ac WHERE ac.artist.id = :artistId")
    List<Category> findCategoriesOfArtist(Long artistId);

    @Query("SELECT ac FROM ArtistCategory ac WHERE ac.category.id = :categoryId")
    List<ArtistCategory> findByCategory(Long categoryId);

    @Query("SELECT ac FROM ArtistCategory ac WHERE ac.category.name = :categoryName")
    List<ArtistCategory> findByCategoryName(String categoryName);

    @Query("SELECT ac FROM ArtistCategory ac WHERE ac.artist.id = :artistId AND ac.category.id = :categoryId")
    Optional<ArtistCategory> findByArtistAndCategory(Long artistId, Long categoryId);
}
