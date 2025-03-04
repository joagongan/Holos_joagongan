package com.HolosINC.Holos.Category;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

import java.util.Set;

import com.HolosINC.Holos.artist.Artist;
import com.HolosINC.Holos.work.Work;

import lombok.Data;

@Data
@Entity
@Table(name = "categories")
public class Category {

    @Id
    @SequenceGenerator(name = "category_seq", sequenceName = "category_sequence", initialValue = 100)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "category_seq")
    private Integer id;

    private String name;
    private String description;
    
    @ManyToMany(mappedBy = "category")
    private Set<Artist> artist;

    @ManyToMany(mappedBy = "category")
    private Set<Work> works;
}