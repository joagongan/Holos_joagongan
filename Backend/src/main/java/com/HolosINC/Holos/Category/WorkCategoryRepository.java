package com.HolosINC.Holos.Category;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkCategoryRepository extends JpaRepository<WorkCategory, Long> {
    
    @Query("SELECT COUNT(wc) > 0 FROM WorkCategory wc WHERE wc.work.id = :workId AND wc.category.id = :categoryId")
    boolean workCategoryExist(Long workId, Long categoryId);

    @Query("SELECT ac.category FROM WorkCategory ac WHERE ac.work.id = :workId")
    List<Category> findCategoriesOfWork(Long workId);

    @Query("SELECT wc FROM WorkCategory wc WHERE wc.category.id = :categoryId")
    List<WorkCategory> findByCategory(Long categoryId);

    @Query("SELECT wc FROM WorkCategory wc WHERE wc.category.name = :categoryName")
    List<WorkCategory> findByCategoryName(String categoryName);

    @Query("SELECT wc FROM WorkCategory wc WHERE wc.work.id = :workId AND wc.category.id = :categoryId")
    Optional<WorkCategory> findByWorkAndCategory(Long workId, Long categoryId);
}
