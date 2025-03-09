package com.HolosINC.Holos.milestone;

import java.sql.Date;

import com.HolosINC.Holos.commision.Commision;
import com.HolosINC.Holos.model.BaseEntity;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
@Table(name = "milestones")
@Entity
public class Milestone extends BaseEntity{

    @Size(max = 50)
    private String name;
    
    @NotNull
    private Boolean accepted;
    
    @NotNull
    private Date milestoneDate;

    @ManyToOne
    @JoinColumn(name = "commision_id")
    private Commision commision;
}
