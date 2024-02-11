package com.seasonlink.jobcategories;

import com.seasonlink.jobs.Job;
import io.smallrye.mutiny.Uni;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import org.jboss.resteasy.reactive.RestPath;

import java.util.List;
import java.util.UUID;

@Path("/job-categories")
@Produces(MediaType.APPLICATION_JSON)
public class JobCategoryResource {

    @GET
    public Uni<List<JobCategory>> findAll() {
        return JobCategory.listAll();
    }

    @GET
    @Path("/{id}")
    public Uni<JobCategory> findById(@RestPath UUID id) {
        return JobCategory.findById(id);
    }

    @GET
    @Path("/{id}/jobs")
    public Uni<List<Job>> findJobsByCategoryId(@RestPath UUID id) {
        return Job.findByCategoryId(id);
    }
}
