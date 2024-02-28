resource "random_password" "postgres_password_job_offers" {
  length  = 16
  special = false
}

resource "helm_release" "postgresql_job_offers" {
  name      = "postgresql-job-offers"
  namespace = kubernetes_namespace.season_link.metadata.0.name

  repository = "https://charts.bitnami.com/bitnami"
  chart      = "postgresql"
  version    = "14.2.3"

  set {
    name  = "fullnameOverride"
    value = "postgresql-job-offers"
  }

  set {
    name  = "auth.database"
    value = "joboffers"
  }

  set {
    name  = "auth.username"
    value = "joboffers"
  }

  set {
    name  = "auth.password"
    value = random_password.postgres_password_job_offers.result
  }
}

resource "helm_release" "job_offers" {
  name      = "job-offers"
  namespace = kubernetes_namespace.season_link.metadata.0.name

  repository = "../charts"
  chart      = "job-offers"
  version    = "0.1.0"

  depends_on = [helm_release.postgresql_job_offers]
}
