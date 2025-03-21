package com.HolosINC.Holos.util;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

import com.HolosINC.Holos.exceptions.ResourceNotFoundException;

public class ImageHandler {
    
    public byte[] getBytes(MultipartFile imageProfile) {
        try {
            return imageProfile.getBytes();
        } catch (IOException e) {
            throw new ResourceNotFoundException("Error al obtener la imagen");
        }
    }
}
