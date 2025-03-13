package com.HolosINC.Holos.Kanban;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.validation.constraints.NotNull;

import com.HolosINC.Holos.model.BaseEntity;
import com.HolosINC.Holos.artist.Artist;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "status_kanban_order", uniqueConstraints = @UniqueConstraint(columnNames = { "artist_id", "order_in_kanban"}))
public class StatusKanbanOrder extends BaseEntity {

    @NotNull
    @Column(nullable = false)
    private String name;

    @NotNull
    @Column(name = "order_in_kanban")
    private Integer order;

    private String description;

    @NotNull
    private String color;

    @ManyToOne
    @JoinColumn(name = "artist_id", referencedColumnName = "id",  nullable = false)
    private Artist artist;
}