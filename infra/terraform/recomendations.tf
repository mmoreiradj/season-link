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

resource "kubernetes_manifest" "application_argo_cd_recommendations" {
  manifest = {
    apiVersion = "argoproj.io/v1alpha1"
    kind       = "Application"
    metadata = {
      labels = {
        name = "recommendations"
      }
      name      = "recommendations"
      namespace = "argo-cd"
    }
    spec = {
      destination = {
        namespace = kubernetes_namespace.season_link.metadata.0.name
        server    = "https://kubernetes.default.svc"
      }

      project              = "default"
      revisionHistoryLimit = 3
      source = {
        helm = {
          releaseName = "recommendations"
          valuesObject = {
            fullnameOverride = "recommendations"
          }
        }
        path           = "infra/charts/recommendations"
        repoURL        = "https://github.com/mmoreiradj/season-link.git"
        targetRevision = "make/ci"
      }
      syncPolicy = {
        automated = {
          prune      = true
          selfHeal   = true
          allowEmpty = true
        }
        retry = {
          limit = 3
          backoff = {
            duration    = 5
            factor      = 2
            maxDuration = 60
          }
        }
        syncOptions = [
          "Validate=false",
          "CreateNamespace=false",
          "PrunePropagationPolicy=foreground",
          "PruneLast=true",
          "RespectIgnoreDifferences=true"
        ]
      }
    }
  }
}
