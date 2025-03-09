package com.HolosINC.Holos.auth;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.HolosINC.Holos.artist.Artist;
import com.HolosINC.Holos.artist.ArtistService;
import com.HolosINC.Holos.auth.payload.request.SignupRequest;
import com.HolosINC.Holos.client.Client;
import com.HolosINC.Holos.client.ClientService;
import com.HolosINC.Holos.model.BaseUser;
import com.HolosINC.Holos.model.BaseUserService;

@Service
public class AuthoritiesService {

	private final PasswordEncoder encoder;
	private final BaseUserService baseUserService;
	private final ArtistService artistService;
	private final ClientService clientService;

	@Autowired
	public AuthoritiesService(PasswordEncoder encoder, BaseUserService baseUserService, ArtistService artistService, ClientService clientService) {
		this.encoder = encoder;
		this.baseUserService = baseUserService;
		this.artistService = artistService;
		this.clientService = clientService;
	}

	@Transactional
	public Authorities findByAuthority(String authority) {
		return null;
	}

	@Transactional
	public void createUser(@Valid SignupRequest request) {
		BaseUser user = new BaseUser();
		user.setUsername(request.getUsername());
		user.setPassword(encoder.encode(request.getPassword()));
		String strRoles = request.getAuthority();
		Authorities role;

		switch (strRoles.toLowerCase()) {
		case "admin":
			role = findByAuthority("ADMIN");
			user.setAuthority(role);
			baseUserService.save(user);
			break;
		case "client":
			role = findByAuthority("CLIENT");
			Client client = new Client();
			user.setAuthority(role);
			clientService.saveClient(client);
			break;
		case "artist":
			role = findByAuthority("ARTIST");
			Artist artist = new Artist();
			user.setAuthority(role);
			artistService.saveArtist(artist);
			break;
		default:
			role = findByAuthority("OWNER");
			user.setAuthority(role);
			baseUserService.save(user);

		}
	}

}
