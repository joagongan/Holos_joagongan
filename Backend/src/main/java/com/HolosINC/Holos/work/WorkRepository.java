package com.HolosINC.Holos.work;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkRepository extends JpaRepository<Work, Long>{
    
    @Query("SELECT w FROM Work w WHERE LOWER(w.name) LIKE LOWER(CONCAT('%', :query, '%'))")
    Page<Work> searchByTitle(@Param("query") String query, Pageable pageable);

    //@Query("SELECT w FROM Work w WHERE (:category IS NULL OR LOWER(w.category) = LOWER(:category))")
    //Page<Work> searchByCategory(@Param("category") String category, Pageable pageable);

    @Query("SELECT w FROM Work w WHERE (:minPrice IS NULL OR w.price >= :minPrice) AND (:maxPrice IS NULL OR w.price <= :maxPrice)")
    Page<Work> searchByPriceRange(@Param("minPrice") Double minPrice, @Param("maxPrice") Double maxPrice, Pageable pageable);

    @Query("SELECT w FROM Work w WHERE w.artist.id = :artistId")
    Page<Work> searchByArtist(@Param("artistId") Integer artistId, Pageable pageable);
    
}
