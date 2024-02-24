resource "helm_release" "gateway" {
  name      = "gateway"
  namespace = kubernetes_namespace.season_link.metadata.0.name

  repository = "../charts"
  chart      = "gateway"
  version    = "0.1.0"

  set {
    name  = "image.tag"
    value = var.app_version
  }

  values = [
    file("${path.module}/values/gateway.yaml"),
  ]
}
