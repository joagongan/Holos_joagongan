package com.HolosINC.Holos.artist;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.HolosINC.Holos.Profile.ProfileService;
import com.HolosINC.Holos.exceptions.ResourceNotFoundException;
import com.HolosINC.Holos.model.BaseUserDTO;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("api/v1/artists")
@SecurityRequirement(name = "bearerAuth")
@Tag(name = "Artist", description = "API for managing artists")
class ArtistRestController {

    private final ArtistService artistService;
    
    private final ProfileService profileService;
	
    @Autowired
	public ArtistRestController(ArtistService artistService, ProfileService profileService) {
        this.artistService = artistService;
        this.profileService = profileService;
	}
	

    @PutMapping("/update")
    public ResponseEntity<BaseUserDTO> updateProfile(@RequestBody BaseUserDTO baseUserDTO) {
        BaseUserDTO updatedUserDTO = profileService.updateProfile(baseUserDTO);
        return ResponseEntity.ok(updatedUserDTO);
    
	}
	
	@GetMapping(value = "/{id}")
	@Operation(summary = "Get artist", description = "Retrieve a list of all artists")
	public ResponseEntity<Artist> findById(@PathVariable("id") Long id) {
		return new ResponseEntity<>(artistService.findArtist(id), HttpStatus.OK);
	}

    
    @DeleteMapping("/administrator/artists/{id}")
    public ResponseEntity<?> deleteArtist(@PathVariable Long id) {
        try {
            artistService.deleteArtist(id);
            return ResponseEntity.ok().body("Cliente eliminado exitosamente");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

	@GetMapping(value = "username/{username}")
	@Operation(summary = "Get artist", description = "Retrieve a list of all artists")
	public ResponseEntity<Artist> findByUsername(@PathVariable("username") String username) {
		try {
            Artist artist = artistService.findArtistByUsername(username);
            return new ResponseEntity<>(artist, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
	}

}
