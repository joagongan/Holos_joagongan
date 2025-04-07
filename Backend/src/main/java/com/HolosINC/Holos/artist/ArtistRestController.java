package com.HolosINC.Holos.artist;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("api/v1/artists")
@SecurityRequirement(name = "bearerAuth")
@Tag(name = "Artist", description = "API for managing artists")
class ArtistRestController {

	private final ArtistService artistService;

	@Autowired
	public ArtistRestController(ArtistService artistService) {
		this.artistService = artistService;
	}

	@GetMapping(value = "/{id}")
	@Operation(summary = "Get artist", description = "Retrieve a list of all artists")
	public ResponseEntity<?> findById(@PathVariable("id") Long id) {
		try {
			Artist artist = artistService.findArtist(id);
			ArtistDTO artistDTO = ArtistDTO.builder()
					.artistId(artist.getId())
					.baseUserId(artist.getBaseUser().getId())
					.name(artist.getBaseUser().getName())
					.username(artist.getBaseUser().getUsername())
					.email(artist.getBaseUser().getEmail())
					.phoneNumber(artist.getBaseUser().getPhoneNumber())
					.imageProfile(artist.getBaseUser().getImageProfile())
					.numSlotsOfWork(artist.getNumSlotsOfWork())
					.tableCommisionsPrice(artist.getTableCommisionsPrice())
					.description(artist.getDescription())
					.linkToSocialMedia(artist.getLinkToSocialMedia())
					.build();
			return new ResponseEntity<>(artistDTO, HttpStatus.OK);

		} catch (Exception e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}

    
    @DeleteMapping("/administrator/artists/{id}")
    public ResponseEntity<?> deleteArtist(@PathVariable Long id) {
        try {
            artistService.deleteArtist(id);
            return ResponseEntity.ok().body("Cliente eliminado exitosamente");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

	@GetMapping(value = "username/{username}")
	@Operation(summary = "Get artist", description = "Retrieve a list of all artists")
	public ResponseEntity<?> findByUsername(@PathVariable("username") String username) {
		try{
			return new ResponseEntity<>(artistService.findArtistByUsername(username), HttpStatus.OK);
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}

}
