package com.HolosINC.Holos.auth;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

import java.time.Instant;
import java.util.Date;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.HolosINC.Holos.artist.Artist;
import com.HolosINC.Holos.artist.ArtistService;
import com.HolosINC.Holos.auth.payload.request.SignupRequest;
import com.HolosINC.Holos.client.Client;
import com.HolosINC.Holos.client.ClientService;
import com.HolosINC.Holos.exceptions.AccessDeniedException;
import com.HolosINC.Holos.exceptions.ResourceNotFoundException;
import com.HolosINC.Holos.model.BaseUser;
import com.HolosINC.Holos.model.BaseUserService;
import com.HolosINC.Holos.util.ImageHandler;

@Service
public class AuthoritiesService {

	private final PasswordEncoder encoder;
	private final BaseUserService baseUserService;
	private final ArtistService artistService;
	private final ClientService clientService;
	private final AuthoritiesRepository authoritiesRepository;

	@Autowired
	private ImageHandler imageHandler;

	@Autowired
	public AuthoritiesService(PasswordEncoder encoder, BaseUserService baseUserService, ArtistService artistService,
			ClientService clientService, AuthoritiesRepository authoritiesRepository) {
		this.encoder = encoder;
		this.baseUserService = baseUserService;
		this.artistService = artistService;
		this.clientService = clientService;
		this.authoritiesRepository = authoritiesRepository;
	}

	@Transactional
	public Authorities findByAuthority(String authority) {
		Optional<Authorities> authorities = authoritiesRepository.findByName(authority);
		if (!authorities.isPresent()) {
			throw new ResourceNotFoundException("Este rol no existe");
		}
		return authorities.get();
	}

	@Transactional
	public void createUser(@Valid SignupRequest request) throws Exception {

		try {
			if(authoritiesRepository.existsBaseUserByUsername(request.getUsername()))
				throw new IllegalArgumentException("Nombre de usuario ya existente en la base de datos.");
			if(authoritiesRepository.existsBaseUserByUsername(request.getEmail()))
				throw new IllegalArgumentException("Email ya existente en la base de datos.");
			if (request.getImageProfile().getSize() > 5 * 1024 * 1024) 
				throw new IllegalArgumentException("La imagen de perfil no puede ser mayor a 5MB.");
			
			// Crear el usuario base
			BaseUser user = new BaseUser();
			user.setUsername(request.getUsername());
			user.setName(request.getFirstName());
			user.setCreatedUser(Date.from(Instant.now()));
			user.setPassword(encoder.encode(request.getPassword()));
			user.setEmail(request.getEmail());
			user.setPhoneNumber(request.getPhoneNumber());
			user.setImageProfile(imageHandler.getBytes(request.getImageProfile()));
	
			String strRoles = request.getAuthority().toUpperCase();
			Authorities role = findByAuthority(strRoles);
			user.setAuthority(role);
	
			if (strRoles.equals("ARTIST")) {
				baseUserService.save(user);
	
				Artist artist = new Artist();
				artist.setBaseUser(user);
	
				if (request.getTableCommissionsPrice() != null) {
					artist.setTableCommisionsPrice(imageHandler.getBytes(request.getTableCommissionsPrice()));
				}
	
				artistService.saveArtist(artist);
	
			} else if (strRoles.equals("CLIENT")) {
				Client client = new Client();
				baseUserService.save(user);
				client.setBaseUser(user);
				clientService.saveClient(client);
	
			} else {
				baseUserService.save(user);
			}
		} catch (Exception e) {
			throw e;
		}
	}

	@Transactional
	public BaseUser updateUser(@Valid SignupRequest request) throws Exception {
		try {
			BaseUser user = baseUserService.findCurrentUser();
			if (request.getImageProfile() != null && request.getImageProfile().getSize() > 5 * 1024 * 1024) {
				throw new IllegalArgumentException("La imagen de perfil no puede ser mayor a 5MB.");
			}

			if (request.getTableCommissionsPrice() != null && request.getTableCommissionsPrice().getSize() > 5 * 1024 * 1024) {
				throw new IllegalArgumentException("La tabla de comisiones no puede ser mayor a 5MB.");
			}

			if (request.getUsername() != null) {
				user.setUsername(request.getUsername());
			}
			if (request.getFirstName() != null) {
				user.setName(request.getFirstName());
			}
			user.setUpdatedUser(Date.from(Instant.now()));
			if (request.getPassword() != null) {
				user.setPassword(encoder.encode(request.getPassword()));
			}
			if (request.getEmail() != null) {
				user.setEmail(request.getEmail());
			}
			if (request.getPhoneNumber() != null) {
				user.setPhoneNumber(request.getPhoneNumber());
			}
			if (request.getImageProfile() != null) {
				user.setImageProfile(imageHandler.getBytes(request.getImageProfile()));
			}

			if (user.getAuthority().getAuthority().toUpperCase() == "ARTIST") {
				Artist artist = artistService.findArtist(user.getId());
				if (request.getTableCommissionsPrice() != null) {
					artist.setTableCommisionsPrice(imageHandler.getBytes(request.getTableCommissionsPrice()));
				}
				artist.setBaseUser(user);
				artistService.saveArtist(artist);
			} else if (user.getAuthority().getAuthority().toUpperCase() == "CLIENT") {
				Client client = clientService.findClient(user.getId());
				client.setBaseUser(user);
			} 
			return baseUserService.save(user);
		} catch (Exception e) {
			throw e;
		}
	}

	@Transactional
	public void deleteUser(Long id) {
		BaseUser user = baseUserService.findCurrentUser();
		if (user.getId() != id) {
			throw new AccessDeniedException("No puedes eliminar un usuario que no eres tu");
		} else if (user.getAuthority().getAuthority().equals("ADMIN")) {
			throw new AccessDeniedException("No puedes eliminar un usuario administrador");
		}
		if (user.getAuthority().getAuthority().equals("ARTIST")) {
			Artist artist = artistService.findArtist(id);
			artistService.deleteArtist(artist.getId());
		} else if (user.getAuthority().getAuthority().equals("CLIENT")) {
			Client client = clientService.findClientByUserId(id);
			clientService.deleteClient(client.getId());
		}
		baseUserService.delete(id);
	}
}
