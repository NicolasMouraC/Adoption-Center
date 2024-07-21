package com.adoptioncenter.api;

import com.adoptioncenter.api.controller.AnimalController;
import com.adoptioncenter.api.dto.AnimalDTO;
import com.adoptioncenter.api.entity.Animal;
import com.adoptioncenter.api.service.AnimalService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.time.LocalDate;
import java.util.Collections;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

public class AnimalControllerTests {

    @Mock
    private AnimalService animalService;

    @InjectMocks
    private AnimalController animalController;

    private MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(animalController).build();
    }

    @Test
    void testGetAllAnimals() throws Exception {
        AnimalDTO animalDTO = new AnimalDTO(1L, "Dog", "Friendly dog", "url", "Dog", LocalDate.now(), true, 3);
        when(animalService.findAll(any(), any(), any(), any(), any())).thenReturn(Collections.singletonList(animalDTO));

        mockMvc.perform(get("/api/animals"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value("Dog"))
                .andExpect(jsonPath("$[0].description").value("Friendly dog"));
    }

    @Test
    void testAddAnimal() throws Exception {
        String responseMessage = "Animal saved successfully";
        when(animalService.saveAnimal(any(), any(), any(), any(), any(), any())).thenReturn(responseMessage);

        MockMultipartFile imageFile = new MockMultipartFile("image", "image.png", "image/png", "image content".getBytes());

        mockMvc.perform(multipart("/api/animals/add")
                        .file(imageFile)
                        .param("name", "Dog")
                        .param("description", "Friendly dog")
                        .param("category", "Dog")
                        .param("birthDate", "2020-01-01")
                        .param("status", "true"))
                .andExpect(status().isCreated())
                .andExpect(content().string(responseMessage));
    }

    @Test
    void testUpdateAnimalStatus() throws Exception {
        Animal animal = new Animal(1L, "Dog", "Friendly dog", "url", "Dog", LocalDate.now(), true);
        when(animalService.updateAnimalStatus(anyLong(), any())).thenReturn(ResponseEntity.ok(animal));

        mockMvc.perform(put("/api/animals/1/status")
                        .contentType("application/json")
                        .content("{\"status\": false}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Dog"))
                .andExpect(jsonPath("$.status").value(true));
    }
}
