package com.adoptioncenter.api.dto;

import java.time.LocalDate;

public class AnimalDTO {
    private Long id;
    private String name;
    private String description;
    private String url_image;
    private String category;
    private LocalDate birth_date;
    private Boolean status;
    private int age;

    public AnimalDTO(Long id, String name, String description, String url_image, String category, LocalDate birth_date, Boolean status, int age) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.url_image = url_image;
        this.category = category;
        this.birth_date = birth_date;
        this.status = status;
        this.age = age;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getUrl_image() {
        return url_image;
    }

    public void setUrl_image(String url_image) {
        this.url_image = url_image;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public LocalDate getBirth_date() {
        return birth_date;
    }

    public void setBirth_date(LocalDate birth_date) {
        this.birth_date = birth_date;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public boolean isStatus() {
        return status;
    }
}
