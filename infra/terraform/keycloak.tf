resource "random_password" "keycloak_admin_password" {
  length  = 24
  special = false
}

resource "helm_release" "keycloak" {
  name      = "keycloak"
  namespace = kubernetes_namespace.season_link.metadata.0.name

  repository = "https://charts.bitnami.com/bitnami"
  chart      = "keycloak"

  values = [
    file("${path.module}/values/keycloak.yaml"),
  ]

  set {
    name  = "fullnameOverride"
    value = "keycloak"
  }

  set {
    name  = "auth.adminPassword"
    value = random_password.keycloak_admin_password.result
  }

  timeout = 600
}
