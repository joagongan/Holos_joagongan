package com.HolosINC.Holos.Kanban;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.validation.constraints.NotNull;
import com.HolosINC.Holos.artist.Artist;
import com.HolosINC.Holos.model.BaseEntity;

@Data
@Entity
@EqualsAndHashCode(callSuper = false)
@Table(name = "status_kanban_order")
public class StatusKanbanOrder extends BaseEntity{

    @NotNull
    @Column(nullable = false)
    private String name;

    @NotNull
    @Column(name = "kanban_order")
    private Integer order;

    private String description;

    @NotNull
    //@Pattern(regexp = "^#([A-Fa-f0-9]{6})$")
    private String color;

    @ManyToOne(optional = false)
    @JoinColumn(name = "artist_id")
    private Artist artist;
}