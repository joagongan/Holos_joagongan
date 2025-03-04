package com.HolosINC.Holos.Category;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkCategoryRepository {
    
    @Query("SELECT CASE WHEN COUNT(wc) > 0 THEN TRUE ELSE FALSE END FROM WorkCategory wc WHERE wc.work.id = ?1 AND wc.category.id = ?2")
    boolean workCategoryExist(Long workId, Long categoryId);

    @Query("SELECT wc FROM WorkCategory wc WHERE wc.work.id = ?1")
    List<WorkCategory> findWorkCategoryByWork(Long workId);

    @Query("SELECT wc FROM WorkCategory wc WHERE wc.category.id = ?1")
    List<WorkCategory> findByCategory(Long categoryId);

    @Query("SELECT wc FROM WorkCategory wc WHERE wc.category.name = ?1")
    List<WorkCategory> findByCategoryName(String categoryName);

    @Query("SELECT wc FROM WorkCategory wc WHERE wc.work.id = ?1 AND wc.category.id = ?2")
    List<WorkCategory> findByWorkAndCategory(Long workId, Long categoryId);
}
