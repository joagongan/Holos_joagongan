package com.HolosINC.Holos.artist;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import com.HolosINC.Holos.model.BaseUser;

import lombok.Data;

@Data
@Entity
@Table(name = "artists")
public class Artist{

    @Id
	@SequenceGenerator(name = "entity_seq", sequenceName = "entity_sequence", initialValue = 100)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "entity_seq")
	protected Integer id;

    @OneToOne
    @JoinColumn(name = "base_user_id", unique = true)
    private BaseUser baseUser;

    @NotNull
    @Min(1)
    private Integer numSlotsOfWork;

    
    private String tableCommisionsPrice;
}
