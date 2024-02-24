resource "random_password" "postgres_password_jobs" {
  length  = 16
  special = false
}

resource "helm_release" "postgresql_jobs" {
  name      = "postgresql-jobs"
  namespace = kubernetes_namespace.season_link.metadata.0.name

  repository = "https://charts.bitnami.com/bitnami"
  chart      = "postgresql"
  version    = "14.2.3"

  set {
    name  = "fullnameOverride"
    value = "postgresql-jobs"
  }

  set {
    name  = "auth.database"
    value = "jobs"
  }

  set {
    name  = "auth.username"
    value = "jobs"
  }

  set {
    name  = "auth.password"
    value = random_password.postgres_password_jobs.result
  }
}

resource "helm_release" "jobs" {
  name      = "jobs"
  namespace = kubernetes_namespace.season_link.metadata.0.name

  repository = "../charts"
  chart      = "jobs"
  version    = "0.1.0"

  set {
    name  = "image.tag"
    value = var.app_version
  }

  depends_on = [helm_release.postgresql_jobs]
}
