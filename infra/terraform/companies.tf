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

resource "kubernetes_manifest" "application_argo_cd_companies" {
  manifest = {
    apiVersion = "argoproj.io/v1alpha1"
    kind       = "Application"
    metadata = {
      labels = {
        name = "companies"
      }
      name      = "companies"
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
          releaseName = "companies"
          valuesObject = {
            fullnameOverride = "companies"
          }
        }
        path           = "infra/charts/companies"
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
