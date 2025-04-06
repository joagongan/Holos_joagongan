package com.HolosINC.Holos.search;

import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.HolosINC.Holos.work.Work;

public class SearchControllerTest {

    private MockMvc mockMvc;

    @Mock
    private SearchService searchService;

    @InjectMocks
    private SearchController searchController;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(searchController).build();
    }

    @Test
    public void testSearchWorksWithAllParams() throws Exception {
        Page<Work> mockPage = new PageImpl<>(List.of(new Work()), PageRequest.of(0, 10), 1);
        when(searchService.searchWorks("cuadro", 50.0, 150.0, 0, 10)).thenReturn(mockPage);

        mockMvc.perform(get("/api/v1/search/works")
                .param("query", "cuadro")
                .param("minPrice", "50.0")
                .param("maxPrice", "150.0")
                .param("page", "0")
                .param("size", "10"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));

        verify(searchService, times(1)).searchWorks("cuadro", 50.0, 150.0, 0, 10);
    }

    @Test
    public void testSearchWorksWithDefaultParams() throws Exception {
        Page<Work> mockPage = new PageImpl<>(List.of(new Work()), PageRequest.of(0, 10), 1);
        when(searchService.searchWorks(null, null, null, 0, 10)).thenReturn(mockPage);

        mockMvc.perform(get("/api/v1/search/works"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));

        verify(searchService, times(1)).searchWorks(null, null, null, 0, 10);
    }

    @Test
    public void testSearchWorksWithOnlyQuery() throws Exception {
        Page<Work> mockPage = new PageImpl<>(List.of(new Work()), PageRequest.of(0, 10), 1);
        when(searchService.searchWorks("paisaje", null, null, 0, 10)).thenReturn(mockPage);

        mockMvc.perform(get("/api/v1/search/works")
                .param("query", "paisaje"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));

        verify(searchService, times(1)).searchWorks("paisaje", null, null, 0, 10);
    }

    @Test
    public void testSearchWorksWithMinAndMaxPriceOnly() throws Exception {
        Page<Work> mockPage = new PageImpl<>(List.of(new Work()), PageRequest.of(0, 10), 1);
        when(searchService.searchWorks(null, 20.0, 80.0, 0, 10)).thenReturn(mockPage);

        mockMvc.perform(get("/api/v1/search/works")
                .param("minPrice", "20.0")
                .param("maxPrice", "80.0"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));

        verify(searchService, times(1)).searchWorks(null, 20.0, 80.0, 0, 10);
    }

    @Test
    public void testSearchWorksWithEmptyResults() throws Exception {
        Page<Work> emptyPage = new PageImpl<>(List.of(), PageRequest.of(0, 10), 0);
        when(searchService.searchWorks("nada", null, null, 0, 10)).thenReturn(emptyPage);

        mockMvc.perform(get("/api/v1/search/works")
                .param("query", "nada"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content").isEmpty());

        verify(searchService).searchWorks("nada", null, null, 0, 10);
    }

    @Test
    public void testSearchWorksPaginationSecondPage() throws Exception {
        Page<Work> mockPage = new PageImpl<>(List.of(new Work()), PageRequest.of(1, 10), 11);
        when(searchService.searchWorks(null, null, null, 1, 10)).thenReturn(mockPage);

        mockMvc.perform(get("/api/v1/search/works")
                .param("page", "1")
                .param("size", "10"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.number").value(1));

        verify(searchService).searchWorks(null, null, null, 1, 10);
    }

}
