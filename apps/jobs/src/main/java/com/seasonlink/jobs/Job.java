package com.seasonlink.jobs;

import io.quarkus.hibernate.reactive.panache.PanacheEntityBase;
import io.smallrye.mutiny.Uni;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

import java.util.List;
import java.util.UUID;

@Entity
public class Job extends PanacheEntityBase {
    @Id @GeneratedValue
    public UUID id;
    public String title;
    public UUID categoryId;

    public static Uni<Job> findById(UUID id) {
        return find("id", id).firstResult();
    }

    public static Uni<List<Job>> findByCategoryId(UUID categoryId) {
        return find("categoryId", categoryId).list();
    }
}
