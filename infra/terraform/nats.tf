resource "helm_release" "nats" {
  name      = "nats"
  namespace = kubernetes_namespace.season_link.metadata.0.name

  repository = "https://nats-io.github.io/k8s/helm/charts"
  chart      = "nats"
  version    = "1.1.9"
}
