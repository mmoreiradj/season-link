package com.seasonlink.jobcategories;

import io.quarkus.hibernate.reactive.panache.PanacheEntityBase;
import io.smallrye.mutiny.Uni;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

import java.util.UUID;

@Entity
public class JobCategory extends PanacheEntityBase {
    @Id
    @GeneratedValue
    public UUID id;
    public String title;

    public static Uni<JobCategory> findById(UUID id) {
        return find("id", id).firstResult();
    }
}
