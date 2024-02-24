resource "random_password" "neo4j_password" {
  length  = 16
  special = false
}

resource "helm_release" "neo4j" {
  name      = "neo4j"
  namespace = kubernetes_namespace.season_link.metadata.0.name

  repository = "https://equinor.github.io/helm-charts/charts/"
  chart      = "neo4j-community"
  version    = "1.2.5"

  set {
    name  = "fullnameOverride"
    value = "neo4j"
  }

  set {
    name  = "authEnabled"
    value = "true"
  }

  set {
    name  = "neo4jPassword"
    value = random_password.neo4j_password.result
  }

  depends_on = [helm_release.nats]
}

resource "helm_release" "recommendations" {
  name      = "recommendations"
  namespace = kubernetes_namespace.season_link.metadata.0.name

  repository = "../charts"
  chart      = "recommendations"
  version    = "0.1.0"

  set {
    name  = "image.tag"
    value = var.app_version
  }
}
