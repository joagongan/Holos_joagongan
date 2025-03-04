package com.HolosINC.Holos.Kanban;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

import java.util.List;

import javax.validation.constraints.NotNull;


@Data
@Entity
@Table(name = "status_kanban")
public class StatusKanban {
    @NotNull
    @Column(nullable = false)
    private String name;

    @OneToMany(mappedBy = "statusKanban")
    private List<StatusKanbanOrder> statusKanbanOrders;
}
