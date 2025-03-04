package com.HolosINC.Holos.Category;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final WorkCategoryRepository workCategoryRepository;
    private final ArtistCategoryRepository artistCategoryRepository;

    @Autowired
    public CategoryService(CategoryRepository categoryRepository, WorkCategoryRepository workCategoryRepository, ArtistCategoryRepository artistCategoryRepository) {
        this.categoryRepository = categoryRepository;
        this.workCategoryRepository = workCategoryRepository;
        this.artistCategoryRepository = artistCategoryRepository;
    }

    @Transactional(readOnly = true)
    public List<Category> findAllCategories() {
        return categoryRepository.findAll();
    }

    @Transactional(readOnly = true)
    public List<Category> findCategoriesByWork(Long workId) {
        List<WorkCategory> workCategory = workCategoryRepository.findWorkCategoryByWork(workId);
        List<Category> categories = new ArrayList<>();
        for(WorkCategory wc: workCategory){
            Category c = wc.getCategory();
            categories.add(c);
        }
        return categories;
    }

    @Transactional(readOnly = true)
    public List<Category> findCategoriesByArtist(Long artistId) {
        List<ArtistCategory> artistCategory = artistCategoryRepository.findArtistCategoryByArtist(artistId);
        List<Category> categories = new ArrayList<>();
        for(ArtistCategory ac: artistCategory){
            Category c = ac.getCategory();
            categories.add(c);
        }
        return categories;
    }

    @Transactional(readOnly = true)
    public Category findCategoryById(Long id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + id));
    }
    
    @Transactional
    public Category saveCategory(Category category) {
        return categoryRepository.save(category);
    }
}
