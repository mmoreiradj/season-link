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

  depends_on = [helm_release.postgresql_chat]
}

resource "kubernetes_manifest" "application_argo_cd_chat" {
  manifest = {
    apiVersion = "argoproj.io/v1alpha1"
    kind       = "Application"
    metadata = {
      labels = {
        name = "chat"
      }
      name      = "chat"
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
          releaseName = "chat"
          valuesObject = {
            fullnameOverride = "chat"
          }
        }
        path           = "infra/charts/chat"
        repoURL        = "https://github.com/mmoreiradj/season-link.git"
        targetRevision = "HEAD"
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

  field_manager {
    name            = "terraform"
    force_conflicts = true
  }
}
