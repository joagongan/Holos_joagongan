package com.HolosINC.Holos.Category;

import java.util.Locale.Category;

import com.HolosINC.Holos.work.Work;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import lombok.Data;

@Data
@Entity
public class WorkCategory {
    
    @Id
	@SequenceGenerator(name = "entity_seq", sequenceName = "entity_sequence", initialValue = 100)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "entity_seq")
	private Long id;

    @ManyToOne
    @JoinColumn(name = "work_id")
    private Work Work;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
}
