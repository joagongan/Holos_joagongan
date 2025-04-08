package com.HolosINC.Holos.commision.DTOs;

import lombok.Getter;
import lombok.Setter;

// com/HolosINC/Holos/commision/DTOs/ClientCommissionDTO.java

@Getter
@Setter
public class ClientCommissionDTO {//Cambio Backend: he añadido id y el client username(lo necesitaba para acceder al chat)
    
    private Long id;
    private byte[] image;
    private byte[] imageProfile;
    private String name;
    private String artistUsername;
    private String clientUsername;   
    private Integer currentStep;
    private Integer totalSteps;

    public ClientCommissionDTO(Long id,byte[] image,String name,String artistUsername,int currentStep,int totalSteps,byte[] imageProfile,String clientUsername    ) {
        this.id = id;
        this.image = image;
        this.name = name;
        this.artistUsername = artistUsername;
        this.currentStep = currentStep;
        this.totalSteps = totalSteps;
        this.imageProfile = imageProfile;
        this.clientUsername = clientUsername; 
    }
}
