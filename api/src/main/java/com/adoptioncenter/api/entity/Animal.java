package com.adoptioncenter.api.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.Period;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Animals")
public class Animal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String description;

    @Setter
    @Column(name = "url_image", length = 500)
    @JsonProperty("url_image")
    private String urlImage;

    private String category;

    @JsonProperty("birth_date")
    private LocalDate birthDate;

    private Boolean status;

    public int getAge() {
        if (birthDate == null) {
            return 0;
        }
        LocalDate currentDate = LocalDate.now();
        return Period.between(birthDate, currentDate).getYears();
    }
}
