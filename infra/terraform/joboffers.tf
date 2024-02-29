resource "random_password" "postgres_password_job_offers" {
  length  = 16
  special = false
}

resource "helm_release" "postgresql_job_offers" {
  name      = "postgresql-job-offers"
  namespace = kubernetes_namespace.season_link.metadata.0.name

  repository = "https://charts.bitnami.com/bitnami"
  chart      = "postgresql"
  version    = "14.2.3"

  set {
    name  = "fullnameOverride"
    value = "postgresql-job-offers"
  }

  set {
    name  = "auth.database"
    value = "joboffers"
  }

  set {
    name  = "auth.username"
    value = "joboffers"
  }

  set {
    name  = "auth.password"
    value = random_password.postgres_password_job_offers.result
  }
}

resource "kubernetes_manifest" "application_argo_cd_job_offers" {
  manifest = {
    apiVersion = "argoproj.io/v1alpha1"
    kind       = "Application"
    metadata = {
      labels = {
        name = "job-offers"
      }
      name      = "job-offers"
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
          releaseName = "job-offers"
          valuesObject = {
            fullnameOverride = "job-offers"
          }
        }
        path           = "infra/charts/job-offers"
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
