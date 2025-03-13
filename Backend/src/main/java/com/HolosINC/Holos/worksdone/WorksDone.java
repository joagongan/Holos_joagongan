package com.HolosINC.Holos.worksdone;

import java.sql.Blob;

import com.HolosINC.Holos.work.Work;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Table(name = "works_done")
@Data
@EqualsAndHashCode(callSuper = true)
public class WorksDone extends Work {

    private String image;
}
