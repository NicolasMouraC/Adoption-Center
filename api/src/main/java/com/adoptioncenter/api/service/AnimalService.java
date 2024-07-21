package com.adoptioncenter.api.service;

import com.adoptioncenter.api.dto.AnimalDTO;
import com.adoptioncenter.api.dto.AnimalStatusUpdateRequest;
import com.adoptioncenter.api.entity.Animal;
import com.adoptioncenter.api.repository.AnimalRepository;
import com.adoptioncenter.api.specification.AnimalSpecification;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.Period;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AnimalService {

    @Autowired
    private AnimalRepository animalRepository;

    @Value("${file.upload-dir}")
    private String uploadDir;

    @PostConstruct
    public void init() throws IOException {
        Path uploadPath = Paths.get(uploadDir).toAbsolutePath().normalize();
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }
    }

    public List<AnimalDTO> findAll(
            String name,
            String category,
            String statusString,
            Integer minAge,
            Integer maxAge
    ) {
        Boolean status = null;
        if (statusString != null) {
            status = statusString.equals("true");
        }

        LocalDate today = LocalDate.now();
        LocalDate minBirthDate = (maxAge != null) ? today.minus(Period.ofYears(maxAge)) : null;
        LocalDate maxBirthDate = (minAge != null) ? today.minus(Period.ofYears(minAge)) : null;

        if (minBirthDate != null && maxBirthDate != null && minBirthDate.isAfter(maxBirthDate)) {
            return Collections.emptyList();
        }

        Specification<Animal> specs = Specification
                .where(AnimalSpecification.hasCategory(category))
                .and(AnimalSpecification.hasStatus(status))
                .and(AnimalSpecification.hasAgeRange(minBirthDate, maxBirthDate))
                .and(AnimalSpecification.hasName(name));

        return animalRepository.findAll(specs)
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public ResponseEntity<Animal> updateAnimalStatus(
            Long id,
            AnimalStatusUpdateRequest animalStatusUpdateRequest
    ) {
        return animalRepository.findById(id)
                .map(animal -> {
                    animal.setStatus(!animalStatusUpdateRequest.isStatus());
                    animalRepository.save(animal);
                    return ResponseEntity.ok(animal);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    public String saveAnimal(
            String name,
            String description,
            String category,
            String birthDateStr,
            Boolean status,
            MultipartFile image
    ) throws IOException {
        String fileName = image.getOriginalFilename();
        if (fileName == null || fileName.isEmpty()) {
            throw new IOException("File name is missing");
        }

        Path filePath = Paths.get(uploadDir, fileName);
        Files.write(filePath, image.getBytes());
        System.out.println("Image saved at: " + filePath.toString());

        String imageUrl = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/images/")
                .path(fileName)
                .toUriString();
        System.out.println("Image URL: " + imageUrl);

        LocalDate birthDate = LocalDate.parse(birthDateStr);
        Animal newAnimal = new Animal();
        newAnimal.setName(name);
        newAnimal.setDescription(description);
        newAnimal.setCategory(category);
        newAnimal.setBirthDate(birthDate);
        newAnimal.setStatus(status);
        newAnimal.setUrlImage(imageUrl);

        animalRepository.save(newAnimal);
        System.out.println("Animal saved with ID: " + newAnimal.getId());

        return "Animal saved successfully";
    }

    private AnimalDTO convertToDto(Animal animal) {
        int age = calculateAge(animal.getBirthDate());
        return new AnimalDTO(
                animal.getId(),
                animal.getName(),
                animal.getDescription(),
                animal.getUrlImage(),
                animal.getCategory(),
                animal.getBirthDate(),
                animal.getStatus(),
                age
        );
    }

    private int calculateAge(LocalDate birthDate) {
        if (birthDate == null) {
            return 0;
        }
        LocalDate currentDate = LocalDate.now();
        return Period.between(birthDate, currentDate).getYears();
    }
}
