package com.HolosINC.Holos.Kanban;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Data;

import javax.validation.constraints.NotNull;

import com.HolosINC.Holos.artist.Artist;
import com.HolosINC.Holos.commision.Commision;

@Data
@Entity
@Table(name = "status_kanban_order")
public class StatusKanbanOrder {

    @Id
	@SequenceGenerator(name = "entity_seq", sequenceName = "entity_sequence", initialValue = 100)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "entity_seq")
	protected Long id;

    @NotNull
    @Column(unique = true, nullable = false)
    private Integer order;

    private String description;

    @NotNull
    @Column(unique = true, nullable = false)
    private String color;

    @ManyToOne
    @JoinColumn(name = "commision_id")
    private Commision commisions;

    @ManyToOne
    @JoinColumn(name = "artist_id")
    private Artist artist;

    @ManyToOne
    @JoinColumn(name = "status_kanban_id")
    private StatusKanban statusKanban;
}