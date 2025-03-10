package com.HolosINC.Holos.artist;

import jakarta.persistence.Entity;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;

import java.sql.Blob;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import com.HolosINC.Holos.model.BaseUser;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@Table(name = "artists")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
@EqualsAndHashCode(callSuper = true)
public class Artist extends BaseUser {

    @NotNull
    @Min(1)
    private Integer numSlotsOfWork;

    private String tableCommisionsPrice;
}
