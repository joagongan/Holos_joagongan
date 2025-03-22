package com.HolosINC.Holos.artist;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import com.HolosINC.Holos.exceptions.ResourceNotFoundException;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ArtistService {

	private ArtistRepository artistRepository;

	@Autowired
	public ArtistService(ArtistRepository artistRepository) {
		this.artistRepository = artistRepository;
	}

	@Transactional
	public Artist saveArtist(Artist artist) throws DataAccessException {
		artistRepository.save(artist);
		return artist;
	}


	@Transactional(readOnly = true)
	public Artist findArtist(Long artistId) {
		return artistRepository.findById(artistId)
				.orElseThrow(() -> new ResourceNotFoundException("Artist", "id", artistId));
	}

	@Transactional(readOnly = true)
	public Artist findArtistByUserId(Long userId) {
		return artistRepository.findArtistByUser(userId)
				.orElseThrow(() -> new ResourceNotFoundException("Artist", "userId", userId));
	}

	@Transactional(readOnly = true)
	public Iterable<Artist> findAll() {
		return artistRepository.findAll();
	}

	@Transactional
	public void deleteArtist(Long artistId) {
		artistRepository.deleteById(artistId);
	}
}
