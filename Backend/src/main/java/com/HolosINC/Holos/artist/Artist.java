package com.HolosINC.Holos.artist;

import jakarta.persistence.Entity;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;

import java.sql.Blob;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import com.HolosINC.Holos.model.BaseUser;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@Table(name = "artists")
@EqualsAndHashCode(callSuper = true)
public class Artist extends BaseUser{

    @NotNull
    @Min(1)
    private Integer numSlotsOfWork;
    
    @Lob
    private Blob tableCommisionsPrice;
}
