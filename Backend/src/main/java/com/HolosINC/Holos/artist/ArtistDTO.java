package com.HolosINC.Holos.artist;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class ArtistDTO {
    private Long artistId;
    private Long baseUserId;

    private String name;
    private String username;
    private String email;
    private String phoneNumber;

    private byte[] imageProfile;
    private Integer numSlotsOfWork;
    private byte[] tableCommisionsPrice;
    private String description;
    private String city;
    private String linkToSocialMedia;

}
