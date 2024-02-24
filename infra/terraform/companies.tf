resource "random_password" "postgres_password_companies" {
  length  = 16
  special = false
}

resource "helm_release" "postgresql_companies" {
  name      = "postgresql-companies"
  namespace = kubernetes_namespace.season_link.metadata.0.name

  repository = "https://charts.bitnami.com/bitnami"
  chart      = "postgresql"
  version    = "14.2.3"

  set {
    name  = "fullnameOverride"
    value = "postgresql-companies"
  }

  set {
    name  = "auth.database"
    value = "companies"
  }

  set {
    name  = "auth.username"
    value = "companies"
  }

  set {
    name  = "auth.password"
    value = random_password.postgres_password_companies.result
  }
}

resource "helm_release" "companies" {
  name      = "companies"
  namespace = kubernetes_namespace.season_link.metadata.0.name

  repository = "../charts"
  chart      = "companies"
  version    = "0.1.0"

  set {
    name  = "image.tag"
    value = var.app_version
  }

  depends_on = [helm_release.postgresql_companies]
}
