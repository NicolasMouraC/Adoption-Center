package com.adoptioncenter.api.specification;

import com.adoptioncenter.api.entity.Animal;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;

public class AnimalSpecification {

    public static Specification<Animal> hasName(String name) {
        return (root, query, criteriaBuilder) -> {
            if (name == null || name.isEmpty()) {
                return criteriaBuilder.conjunction();
            }
            return criteriaBuilder.like(criteriaBuilder.lower(root.get("name")), "%" + name.toLowerCase() + "%");
        };
    }

    public static Specification<Animal> hasCategory(String category) {
        return (root, query, criteriaBuilder) -> {
            if (category == null || category.isEmpty()) {
                return criteriaBuilder.conjunction();
            }
            return criteriaBuilder.equal(root.get("category"), category);
        };
    }

    public static Specification<Animal> hasStatus(Boolean status) {
        return (root, query, criteriaBuilder) -> {
            if (status == null) {
                return criteriaBuilder.conjunction();
            }
            return criteriaBuilder.equal(root.get("status"), status);
        };
    }

    public static Specification<Animal> hasAgeRange(LocalDate minBirthDate, LocalDate maxBirthDate) {
        return (root, query, criteriaBuilder) -> {
            if (minBirthDate == null && maxBirthDate == null) {
                return criteriaBuilder.conjunction();
            }
            if (minBirthDate != null && maxBirthDate != null) {
                return criteriaBuilder.between(root.get("birthDate"), minBirthDate, maxBirthDate);
            } else if (minBirthDate != null) {
                return criteriaBuilder.greaterThanOrEqualTo(root.get("birthDate"), minBirthDate);
            } else {
                return criteriaBuilder.lessThanOrEqualTo(root.get("birthDate"), maxBirthDate);
            }
        };
    }
}
