package com.HolosINC.Holos.commision.DTOs;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter // Sorry 😖
public class ClientCommissionDTO {

    private byte[] image;

    private byte[] imageProfile;
    
    private String name;

    private String artistUsername;

    private Integer currentStep;

    private Integer totalSteps;

    public ClientCommissionDTO( byte[] image, String name, String artistUsername, int currentStep, int totalSteps, byte[] imageProfile ) {
        this.image = image;
        this.name = name;
        this.artistUsername = artistUsername;
        this.currentStep = currentStep;
        this.totalSteps = totalSteps;
        this.imageProfile = imageProfile;
    }
}
