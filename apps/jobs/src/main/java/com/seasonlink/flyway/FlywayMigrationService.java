package com.seasonlink.flyway;

import io.quarkus.runtime.StartupEvent;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.event.Observes;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.flywaydb.core.Flyway;

@ApplicationScoped
public class FlywayMigrationService {

    @ConfigProperty(name = "quarkus.datasource.reactive.url")
    String datasourceUrl;

    @ConfigProperty(name = "quarkus.datasource.username")
    String datasourceUsername;

    @ConfigProperty(name = "quarkus.datasource.password")
    String datasourcePassword;

    public void runFlywayMigration(@Observes StartupEvent event) {
        String datasourceUrl = "jdbc:" + this.datasourceUrl.substring("vertx-reactive:".length());
        Flyway flyway = Flyway.configure().dataSource(datasourceUrl, datasourceUsername, datasourcePassword).load();
        flyway.migrate();
    }
}
