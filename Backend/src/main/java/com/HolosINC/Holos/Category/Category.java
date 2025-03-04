package com.HolosINC.Holos.Category;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

import java.util.Set;

import lombok.Data;

@Data
@Entity
@Table(name = "categories")
public class Category {

    @Id
    @SequenceGenerator(name = "category_seq", sequenceName = "category_sequence", initialValue = 100)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "category_seq")
    private Long id;

    private String name;
    private String description;
    
    @ManyToMany(mappedBy = "category")
    private Set<ArtistCategory> artistCategories;

    @ManyToMany(mappedBy = "category")
    private Set<WorkCategory> workscCategories;
}