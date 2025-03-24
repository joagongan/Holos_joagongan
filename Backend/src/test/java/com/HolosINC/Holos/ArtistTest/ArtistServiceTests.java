package com.HolosINC.Holos.ArtistTest;

import com.HolosINC.Holos.artist.Artist;
import com.HolosINC.Holos.artist.ArtistRepository;
import com.HolosINC.Holos.artist.ArtistService;
import com.HolosINC.Holos.exceptions.ResourceNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.dao.DataAccessException;
import static org.mockito.Mockito.*;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class ArtistServiceTest {

    @Mock
    private ArtistRepository artistRepository;

    @InjectMocks
    private ArtistService artistService;

    private Artist artist;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        artist = new Artist();
        artist.setId(1L);
        artist.setName("Test Artist");
    }

    @Test
    void testSaveArtist() throws DataAccessException {
        // Arrange
        when(artistRepository.save(artist)).thenReturn(artist);

        // Act
        Artist savedArtist = artistService.saveArtist(artist);

        // Assert
        assertNotNull(savedArtist);
        assertEquals("Test Artist", savedArtist.getName());
        verify(artistRepository, times(1)).save(artist);
    }

    @Test
    void testFindArtist_success() {
        // Arrange
        when(artistRepository.findById(1L)).thenReturn(java.util.Optional.of(artist));

        // Act
        Artist foundArtist = artistService.findArtist(1L);

        // Assert
        assertNotNull(foundArtist);
        assertEquals(1L, foundArtist.getId());
        assertEquals("Test Artist", foundArtist.getName());
    }

    @Test
    void testFindArtist_throwsResourceNotFoundException() {
        // Arrange
        when(artistRepository.findById(1L)).thenReturn(java.util.Optional.empty());

        // Act & Assert
        ResourceNotFoundException exception = assertThrows(ResourceNotFoundException.class, () -> {
            artistService.findArtist(1L);
        });
        assertEquals("Artist not found with id: 1", exception.getMessage());
    }

    @Test
    void testFindAll() {
        List<Artist> artists = java.util.Collections.singletonList(artist);  // Create a List, which is also Iterable
        when(artistRepository.findAll()).thenReturn(artists);   // Return the List

        // Act
        Iterable<Artist> foundArtists = artistService.findAll();

        // Assert
        assertNotNull(foundArtists);
        assertTrue(foundArtists.iterator().hasNext());
        assertEquals("Test Artist", foundArtists.iterator().next().getName());
    }

    @Test
    void testSaveArtist_dataAccessException() {
        // Arrange
        when(artistRepository.save(artist)).thenThrow(DataAccessException.class);

        // Act & Assert
        assertThrows(DataAccessException.class, () -> artistService.saveArtist(artist));
    }
}
