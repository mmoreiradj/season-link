package com.seasonlink.jobs;

import io.smallrye.mutiny.Uni;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import org.jboss.resteasy.reactive.RestPath;

import java.util.List;
import java.util.UUID;

@Path("/jobs")
@Produces(MediaType.APPLICATION_JSON)
public class JobResource {

    @GET
    public Uni<List<Job>> findAll() {
        return Job.listAll();
    }

    @GET
    @Path("/{id}")
    public Uni<Job> findById(@RestPath UUID id) {
        return Job.findById(id);
    }
}
