package com.HolosINC.Holos.Category;

import com.HolosINC.Holos.model.BaseEntity;
import com.HolosINC.Holos.work.Work;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@EqualsAndHashCode(callSuper = false)

@Table(uniqueConstraints = @UniqueConstraint(columnNames = { "work_id", "category_id"}))
public class WorkCategory extends BaseEntity{

    @ManyToOne
    @JoinColumn(name = "work_id", nullable = false)
    private Work work;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;
}
