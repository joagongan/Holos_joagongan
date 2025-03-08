package com.HolosINC.Holos.Category;

import com.HolosINC.Holos.model.BaseEntity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@Table(name = "categories")
@EqualsAndHashCode(callSuper = true)
public class Category extends BaseEntity{

    private String name;
    private String description;
}