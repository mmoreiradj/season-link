resource "random_password" "postgres_password_chat" {
  length  = 16
  special = false
}

resource "helm_release" "postgresql_chat" {
  name      = "postgresql-chat"
  namespace = kubernetes_namespace.season_link.metadata.0.name

  repository = "https://charts.bitnami.com/bitnami"
  chart      = "postgresql"
  version    = "14.2.3"

  set {
    name  = "fullnameOverride"
    value = "postgresql-chat"
  }

  set {
    name  = "auth.database"
    value = "chat"
  }

  set {
    name  = "auth.username"
    value = "chat"
  }

  set {
    name  = "auth.password"
    value = random_password.postgres_password_chat.result
  }
}

resource "helm_release" "chat" {
  name      = "chat"
  namespace = kubernetes_namespace.season_link.metadata.0.name

  repository = "../charts"
  chart      = "chat"
  version    = "0.1.0"

  set {
    name  = "image.tag"
    value = var.app_version
  }

  depends_on = [helm_release.postgresql_chat]
}
