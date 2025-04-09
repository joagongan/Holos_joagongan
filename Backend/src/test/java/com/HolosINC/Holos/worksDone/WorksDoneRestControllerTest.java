package com.HolosINC.Holos.worksDone;

import com.HolosINC.Holos.artist.Artist;
import com.HolosINC.Holos.artist.ArtistService;
import com.HolosINC.Holos.auth.Authorities;
import com.HolosINC.Holos.model.BaseUser;
import com.HolosINC.Holos.model.BaseUserService;
import com.HolosINC.Holos.worksdone.WorksDone;
import com.HolosINC.Holos.worksdone.WorksDoneController;
import com.HolosINC.Holos.worksdone.WorksDoneDTO;
import com.HolosINC.Holos.worksdone.WorksDoneService;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Collections;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

public class WorksDoneRestControllerTest {

    @Mock
    private WorksDoneService worksDoneService;

    @Mock
    private ArtistService artistService;

    @Mock
    private BaseUserService baseUserService;

    @InjectMocks
    private WorksDoneController worksDoneController;

    private MockMvc mockMvc;
    private ObjectMapper objectMapper;

    private Artist artist;
    private WorksDone worksDone;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        // Construimos un MockMvc standalone sin cargar todo el contexto de Spring
        mockMvc = MockMvcBuilders.standaloneSetup(worksDoneController).build();
        objectMapper = new ObjectMapper();

        // Datos base para usar en los tests
        artist = new Artist();
        artist.setId(10L);
        
        // Supongamos que su BaseUser tiene un método hasAuthority(...)
        BaseUser baseUser = new BaseUser();
        baseUser.setId(10L);
        baseUser.setAuthority(new Authorities());
        // Simularemos que, por defecto, NO es premium:
        // Asegúrate de ajustar la lógica a como tu BaseUser maneje las "authorities".
        // Por ejemplo:
        // baseUser.setRoles(...)  // O la forma real en que se indica la "authority"
        
        artist.setBaseUser(baseUser);
        artist.getBaseUser().getAuthority().setAuthority("ARTIST");;

        worksDone = new WorksDone();
        worksDone.setId(1L);
        worksDone.setName("Obra de Prueba");
        worksDone.setArtist(artist);
    }

    // ===========================================================
    // 1) createWorksDone (POST /api/v1/worksdone) [multipart/form-data]
    // ===========================================================
    @Test
    public void testCreateWorksDone_Success_NonPremiumWithLessThan7Works() throws Exception {
        // Escenario: usuario no es premium y solo tiene 6 obras => puede subir la 7ma
        when(baseUserService.findCurrentUser()).thenReturn(artist.getBaseUser());
        when(baseUserService.findArtist(10L)).thenReturn(artist);
        when(worksDoneService.countByArtistId(10L)).thenReturn(6L);

        // Simulamos la devolución de createWorksDone
        when(worksDoneService.createWorksDone(any(WorksDone.class))).thenReturn(worksDone);

        // Preparamos el JSON para la parte "work"
        WorksDoneDTO dto = new WorksDoneDTO();
        dto.setName("Obra de Prueba desde DTO");

        String dtoJson = objectMapper.writeValueAsString(dto);
        MockMultipartFile workPart = new MockMultipartFile(
                "work",
                "work.json",
                "application/json",
                dtoJson.getBytes()
        );

        // Simulamos un archivo de imagen
        MockMultipartFile imagePart = new MockMultipartFile(
                "image",
                "test.jpg",
                "image/jpeg",
                "fakeimagecontent".getBytes()
        );

        mockMvc.perform(multipart("/api/v1/worksdone")
                .file(workPart)
                .file(imagePart)
                .contentType(MediaType.MULTIPART_FORM_DATA))
                .andExpect(status().isOk())  // Se espera 200 OK
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.name").value("Obra de Prueba"));

        verify(worksDoneService, times(1)).countByArtistId(10L);
        verify(worksDoneService, times(1)).createWorksDone(any(WorksDone.class));
    }

    @Test
    public void testCreateWorksDone_Forbidden_NonPremiumWith7Works() throws Exception {
        // Escenario: usuario no es premium y ya tiene 7 obras => debe ser FORBIDDEN
        when(baseUserService.findCurrentUser()).thenReturn(artist.getBaseUser());
        when(baseUserService.findArtist(10L)).thenReturn(artist);
        when(worksDoneService.countByArtistId(10L)).thenReturn(7L);

        // Preparamos el JSON
        WorksDoneDTO dto = new WorksDoneDTO();
        dto.setName("Obra Bloqueada");
        String dtoJson = objectMapper.writeValueAsString(dto);

        MockMultipartFile workPart = new MockMultipartFile(
                "work",
                "work.json",
                "application/json",
                dtoJson.getBytes()
        );

        // Imagen (puede no importar en este escenario)
        MockMultipartFile imagePart = new MockMultipartFile(
                "image",
                "test.jpg",
                "image/jpeg",
                "fakecontent".getBytes()
        );

        mockMvc.perform(multipart("/api/v1/worksdone")
                .file(workPart)
                .file(imagePart)
                .contentType(MediaType.MULTIPART_FORM_DATA))
                .andExpect(status().isForbidden())
                .andExpect(content().string("Has alcanzado el límite de 7 obras. Hazte premium para subir más."));

        verify(worksDoneService, times(1)).countByArtistId(10L);
        verify(worksDoneService, never()).createWorksDone(any(WorksDone.class));
    }

    @Test
    public void testCreateWorksDone_Success_PremiumUser() throws Exception {
        // Escenario: usuario premium => no importa cuántas obras tenga
        when(baseUserService.findCurrentUser()).thenReturn(artist.getBaseUser());
        when(baseUserService.findArtist(10L)).thenReturn(artist);
        artist.getBaseUser().getAuthority().setAuthority("ARTIST_PREMIUM");// Cambiado intencionalmente para probarlo con premium
        // Retornamos un número grande, da igual, es premium
        when(worksDoneService.countByArtistId(10L)).thenReturn(10L);

        when(worksDoneService.createWorksDone(any(WorksDone.class))).thenReturn(worksDone);

        WorksDoneDTO dto = new WorksDoneDTO();
        dto.setName("Obra Premium");
        String dtoJson = objectMapper.writeValueAsString(dto);

        MockMultipartFile workPart = new MockMultipartFile(
                "work",
                "work.json",
                "application/json",
                dtoJson.getBytes()
        );

        // Imagen
        MockMultipartFile imagePart = new MockMultipartFile(
                "image",
                "premium.jpg",
                "image/jpeg",
                "someimagecontent".getBytes()
        );

        mockMvc.perform(multipart("/api/v1/worksdone")
                .file(workPart)
                .file(imagePart)
                .contentType(MediaType.MULTIPART_FORM_DATA))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.name").value("Obra de Prueba"));

        verify(worksDoneService, times(1)).createWorksDone(any(WorksDone.class));
    }

    // ===========================================================
    // 2) getAllWorksDone (GET /api/v1/worksdone)
    // ===========================================================
    @Test
    public void testGetAllWorksDone_Success() throws Exception {
        // Preparamos la respuesta
        WorksDone anotherWork = new WorksDone();
        anotherWork.setId(2L);
        anotherWork.setName("Otra obra");

        when(worksDoneService.getAllWorksDone()).thenReturn(List.of(worksDone, anotherWork));

        mockMvc.perform(get("/api/v1/worksdone"))
                .andExpect(status().isOk())
                // Verificamos que devuelve un array de 2 elementos
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].name").value("Obra de Prueba"))
                .andExpect(jsonPath("$[1].name").value("Otra obra"));

        verify(worksDoneService, times(1)).getAllWorksDone();
    }

    @Test
    public void testGetAllWorksDone_EmptyList() throws Exception {
        when(worksDoneService.getAllWorksDone()).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/api/v1/worksdone"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(0)); // array vacío

        verify(worksDoneService, times(1)).getAllWorksDone();
    }

    // ===========================================================
    // 3) getWorksDoneById (GET /api/v1/worksdone/{id})
    // ===========================================================
    @Test
    public void testGetWorksDoneById_Success() throws Exception {
        when(worksDoneService.getWorksDoneById(1L)).thenReturn(worksDone);

        mockMvc.perform(get("/api/v1/worksdone/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.name").value("Obra de Prueba"));

        verify(worksDoneService, times(1)).getWorksDoneById(1L);
    }

    @Test
    public void testGetWorksDoneById_NotFound() throws Exception {
        when(worksDoneService.getWorksDoneById(999L)).thenReturn(null);

        mockMvc.perform(get("/api/v1/worksdone/999"))
                .andExpect(status().isNotFound());

        verify(worksDoneService, times(1)).getWorksDoneById(999L);
    }

    // ===========================================================
    // 4) getWorksDoneByArtist (GET /api/v1/worksdone/artist/{artistId})
    // ===========================================================
    @Test
    public void testGetWorksDoneByArtist_Success() throws Exception {
        // Supongamos que no hay excepción
        when(artistService.findArtist(10L)).thenReturn(artist);
        when(worksDoneService.getWorksDoneByArtist(artist)).thenReturn(List.of(worksDone));

        mockMvc.perform(get("/api/v1/worksdone/artist/10"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1))
                .andExpect(jsonPath("$[0].id").value(1));

        verify(artistService, times(1)).findArtist(10L);
        verify(worksDoneService, times(1)).getWorksDoneByArtist(artist);
    }

    @Test
    public void testGetWorksDoneByArtist_Error() throws Exception {
        // Simulamos que findArtist lanza excepción
        when(artistService.findArtist(999L))
                .thenThrow(new RuntimeException("No se encontró el artista"));

        mockMvc.perform(get("/api/v1/worksdone/artist/999"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("No se encontró el artista"));

        verify(artistService, times(1)).findArtist(999L);
        verify(worksDoneService, never()).getWorksDoneByArtist(any());
    }

    // ===========================================================
    // 5) updateWorksDone (PUT /api/v1/worksdone/artist/{artistId}/{worksDoneId})
    // ===========================================================
    @Test
    public void testUpdateWorksDone_Success() throws Exception {
        // Escenario normal
        when(worksDoneService.getWorksDoneById(1L)).thenReturn(worksDone);
        when(baseUserService.findCurrentUser()).thenReturn(artist.getBaseUser());
        when(baseUserService.findArtist(10L)).thenReturn(artist);
        // El existingWork sí pertenece a currentArtist => OK
        when(worksDoneService.updateWorksDone(any(WorksDone.class), eq(1L), eq(10L)))
                .thenReturn(worksDone);

        WorksDoneDTO dto = new WorksDoneDTO();
        dto.setName("Obra Modificada");
        String dtoJson = objectMapper.writeValueAsString(dto);

        MockMultipartFile workPart = new MockMultipartFile(
                "work",
                "update.json",
                "application/json",
                dtoJson.getBytes()
        );

        // Imagen opcional
        MockMultipartFile imagePart = new MockMultipartFile(
                "image",
                "update.jpg",
                "image/jpeg",
                "updatedimage".getBytes()
        );

        mockMvc.perform(multipart("/api/v1/worksdone/artist/10/1")
                .file(workPart)
                .file(imagePart)
                .contentType(MediaType.MULTIPART_FORM_DATA)
                .with(request -> {
                    request.setMethod("PUT"); // multipart usa POST por defecto, lo forzamos a PUT
                    return request;
                }))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Obra de Prueba"));  
                // Observa que en tu controlador, el objeto final devuelto es "updated"
                // y lo metes en WorksDoneDTO. Ajusta si necesitas ver la propiedad actualizada.

        verify(worksDoneService, times(1)).updateWorksDone(any(WorksDone.class), eq(1L), eq(10L));
    }

    @Test
    public void testUpdateWorksDoneWithoutImage_Success() throws Exception {
        // Escenario normal
        when(worksDoneService.getWorksDoneById(1L)).thenReturn(worksDone);
        when(baseUserService.findCurrentUser()).thenReturn(artist.getBaseUser());
        when(baseUserService.findArtist(10L)).thenReturn(artist);
        // El existingWork sí pertenece a currentArtist => OK
        when(worksDoneService.updateWorksDone(any(WorksDone.class), eq(1L), eq(10L)))
                .thenReturn(worksDone);

        WorksDoneDTO dto = new WorksDoneDTO();
        dto.setName("Obra Modificada");
        String dtoJson = objectMapper.writeValueAsString(dto);

        MockMultipartFile workPart = new MockMultipartFile(
                "work",
                "update.json",
                "application/json",
                dtoJson.getBytes()
        );

        MockMultipartFile imagePart = new MockMultipartFile(
                "image",
                "update.json",
                "application/json",
                "".getBytes()
        );

        mockMvc.perform(multipart("/api/v1/worksdone/artist/10/1")
                .file(workPart)
                .file(imagePart)
                .contentType(MediaType.MULTIPART_FORM_DATA)
                .with(request -> {
                    request.setMethod("PUT"); // multipart usa POST por defecto, lo forzamos a PUT
                    return request;
                }))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Obra de Prueba"));  
                // Observa que en tu controlador, el objeto final devuelto es "updated"
                // y lo metes en WorksDoneDTO. Ajusta si necesitas ver la propiedad actualizada.

        verify(worksDoneService, times(1)).updateWorksDone(any(WorksDone.class), eq(1L), eq(10L));
    }

    @Test
    public void testUpdateWorksDone_Forbidden_OtherArtist() throws Exception {
        WorksDone existingWork = new WorksDone();
        Artist otherArtist = new Artist();
        otherArtist.setId(99L);
        existingWork.setId(1L);
        existingWork.setArtist(otherArtist);

        when(worksDoneService.getWorksDoneById(1L)).thenReturn(existingWork);
        when(baseUserService.findCurrentUser()).thenReturn(artist.getBaseUser());
        when(baseUserService.findArtist(10L)).thenReturn(artist);

        WorksDoneDTO dto = new WorksDoneDTO();
        dto.setName("Cambia algo");
        String dtoJson = objectMapper.writeValueAsString(dto);

        MockMultipartFile workPart = new MockMultipartFile(
                "work",
                "update.json",
                "application/json",
                dtoJson.getBytes()
        );

        mockMvc.perform(multipart("/api/v1/worksdone/artist/10/1")
                .file(workPart)
                .contentType(MediaType.MULTIPART_FORM_DATA)
                .with(request -> {
                    request.setMethod("PUT");
                    return request;
                }))
                .andExpect(status().isForbidden());

        verify(worksDoneService, never()).updateWorksDone(any(WorksDone.class), anyLong(), anyLong());
    }

    @Test
    public void testUpdateWorksDone_NotFound() throws Exception {
        // getWorksDoneById retorna null => 404
        when(worksDoneService.getWorksDoneById(999L)).thenReturn(null);

        WorksDoneDTO dto = new WorksDoneDTO();
        dto.setName("No existe");
        String dtoJson = objectMapper.writeValueAsString(dto);

        MockMultipartFile workPart = new MockMultipartFile(
                "work",
                "update.json",
                "application/json",
                dtoJson.getBytes()
        );

        mockMvc.perform(multipart("/api/v1/worksdone/artist/10/999")
                .file(workPart)
                .contentType(MediaType.MULTIPART_FORM_DATA)
                .with(request -> {
                    request.setMethod("PUT");
                    return request;
                }))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("WorksDone not found with ID: 999"));

        verify(worksDoneService, never()).updateWorksDone(any(WorksDone.class), anyLong(), anyLong());
    }

    // ===========================================================
    // 6) canUserUploadWork (GET /api/v1/worksdone/can-upload)
    // ===========================================================
    @Test
    public void testCanUserUploadWork_True_NonPremiumLessThan7() throws Exception {
        // Escenario: usuario no premium pero con < 7 obras => true
        when(baseUserService.findCurrentUser()).thenReturn(artist.getBaseUser());
        when(baseUserService.findArtist(10L)).thenReturn(artist);
        when(worksDoneService.countByArtistId(10L)).thenReturn(5L);

        mockMvc.perform(get("/api/v1/worksdone/can-upload"))
                .andExpect(status().isOk())
                .andExpect(content().string("true"));
    }

    @Test
    public void testCanUserUploadWork_False_NonPremiumWith7() throws Exception {
        // Escenario: usuario no premium con 7 obras => false
        when(baseUserService.findCurrentUser()).thenReturn(artist.getBaseUser());
        when(baseUserService.findArtist(10L)).thenReturn(artist);
        when(worksDoneService.countByArtistId(10L)).thenReturn(7L);

        mockMvc.perform(get("/api/v1/worksdone/can-upload"))
                .andExpect(status().isOk())
                .andExpect(content().string("false"));
    }

    @Test
    public void testCanUserUploadWork_True_Premium() throws Exception {
        // Escenario: usuario premium => siempre true
        when(baseUserService.findCurrentUser()).thenReturn(artist.getBaseUser());
        when(baseUserService.findArtist(10L)).thenReturn(artist);
        artist.getBaseUser().getAuthority().setAuthority("ARTIST_PREMIUM");

        mockMvc.perform(get("/api/v1/worksdone/can-upload"))
                .andExpect(status().isOk())
                .andExpect(content().string("true"));
    }
}
