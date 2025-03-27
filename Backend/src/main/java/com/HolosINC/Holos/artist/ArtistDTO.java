package com.HolosINC.Holos.Artist;

import com.HolosINC.Holos.model.BaseUserDTO;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ArtistDTO extends BaseUserDTO {
   
    @NotNull
    @Min(1)
    private Integer numSlotsOfWork;

    private byte[] tableCommisionsPrice;

    
}
