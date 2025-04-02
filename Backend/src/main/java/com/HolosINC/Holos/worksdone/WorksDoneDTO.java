package com.HolosINC.Holos.worksdone;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class WorksDoneDTO {
    
    private Long id;
    private String name;
    private String description;
    private Double price;
    private byte[] image;
    private Long artistId;
    private Long baseUserId;
    private String artistName;
    private String artistSurname;
}
