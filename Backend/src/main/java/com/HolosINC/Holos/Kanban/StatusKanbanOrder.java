package com.HolosINC.Holos.Kanban;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;

import java.util.List;

import javax.validation.constraints.NotNull;

import com.HolosINC.Holos.artist.Artist;
import com.HolosINC.Holos.commision.Commision;

@Data
@Entity
@Table(name = "status_kanban_order")
public class StatusKanbanOrder {
    @NotNull
    @Column(unique = true, nullable = false)
    private Integer order;

    private String description;

    @NotNull
    @Column(unique = true, nullable = false)
    private String color;

    @OneToMany(mappedBy = "statusKanbanOrder")
    private List<Commision> commisions;

    @OneToOne
    @JoinColumn(name = "status_kanban_id", unique = true)
    private StatusKanban statusKanban;

    @OneToOne
    @JoinColumn(name = "artist_id", unique = true)
    private Artist artist;

}
