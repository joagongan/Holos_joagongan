package com.HolosINC.Holos.Category;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.HolosINC.Holos.exceptions.ResourceNotFoundException;

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
        List<Category> categories = workCategoryRepository.findCategoriesOfWork(workId);
        return categories;
    }

    @Transactional(readOnly = true)
    public List<Category> findCategoriesByArtist(Long artistId) {
        List<Category> categories = artistCategoryRepository.findCategoriesOfArtist(artistId);
        return categories;
    }

    @Transactional(readOnly = true)
    public Category findCategoryById(Long id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + id));
    }
    
    @Transactional
    public Category saveCategory(Category category) {
        try {
            // Aquí simplemente guardamos la categoría, incluidas las imágenes
            return categoryRepository.save(category);
        } catch (DataIntegrityViolationException e) {
            throw new RuntimeException("No se puede guardar la categoría debido a restricciones de integridad.");
        } catch (Exception e) {
            throw new RuntimeException("Error interno al guardar la categoría.");
        }
    }

    @Transactional
public Category updateCategory(Long categoryId, Category updatedCategory) {
    try {
        // Buscar la categoría que queremos actualizar
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Category", "id", categoryId));

        // Actualizar los valores de la categoría, incluyendo la imagen
        category.setName(updatedCategory.getName());
        category.setDescription(updatedCategory.getDescription());

        // Aquí actualizamos la imagen como un arreglo de bytes
        category.setImage(updatedCategory.getImage());

        // Guardamos los cambios
        Category savedCategory = categoryRepository.save(category);
        return savedCategory;

    } catch (ResourceNotFoundException e) {
        throw e; // Re-throw if category not found
    } catch (DataIntegrityViolationException e) {
        throw new RuntimeException("No se puede actualizar la categoría con ID " + categoryId +
                                   " debido a restricciones de integridad.");
    } catch (Exception e) {
        throw new RuntimeException("Error interno al actualizar la categoría con ID " + categoryId);
    }
}

    
    @Transactional
    public void deleteCategory(Long categoryId) {
        try {
            if (!categoryRepository.existsById(categoryId)) {
                throw new ResourceNotFoundException("Category", "id", categoryId);
            }
    
            categoryRepository.deleteById(categoryId);
    
        } catch (DataIntegrityViolationException e) {
            throw new RuntimeException("No se puede eliminar la categoría con ID " + categoryId + 
                                       " debido a restricciones de integridad.");
        } catch (Exception e) {
            throw new RuntimeException("Error interno al eliminar la categoría con ID " + categoryId);
        }
    }
    
}
