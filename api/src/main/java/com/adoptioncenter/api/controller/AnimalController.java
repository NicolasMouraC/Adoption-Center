package com.adoptioncenter.api.controller;

import com.adoptioncenter.api.dto.AnimalDTO;
import com.adoptioncenter.api.dto.AnimalStatusUpdateRequest;
import com.adoptioncenter.api.entity.Animal;
import com.adoptioncenter.api.service.AnimalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/animals")
public class AnimalController {

    @Autowired
    private AnimalService animalService;

    @GetMapping()
    public ResponseEntity<List<AnimalDTO>> getAllAnimals(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) Integer minAge,
            @RequestParam(required = false) Integer maxAge
    ) {
        try {
            List<AnimalDTO> animals = animalService.findAll(
                    name,
                    category,
                    status,
                    minAge,
                    maxAge
            );
            return ResponseEntity.ok(animals);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    @PostMapping("/add")
    public ResponseEntity<String> addAnimal(
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("category") String category,
            @RequestParam("birthDate") String birthDateStr,
            @RequestParam("status") Boolean status,
            @RequestParam("image") MultipartFile image) {
        try {
            String responseMessage = animalService.saveAnimal(
                    name,
                    description,
                    category,
                    birthDateStr,
                    status,
                    image
            );
            return new ResponseEntity<>(responseMessage, HttpStatus.CREATED);
        } catch (IOException e) {
            return ResponseEntity.status(500).body(
                    "Error saving animal: " + e.getMessage()
            );
        }
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Animal> updateAnimalStatus(
            @PathVariable Long id,
            @RequestBody AnimalStatusUpdateRequest animalStatusUpdateRequest) {
        try {
            return animalService.updateAnimalStatus(
                    id,
                    animalStatusUpdateRequest
            );
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
