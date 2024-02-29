resource "random_password" "profiles_user_password" {
  length  = 24
  special = false
}

resource "kubernetes_secret" "profiles_user_password" {
  metadata {
    name      = "profiles-user-password"
    namespace = kubernetes_namespace.season_link.metadata.0.name
  }

  data = {
    password = random_password.profiles_user_password.result
  }
}

resource "random_password" "minio_access_key" {
  length  = 24
  special = false
}

resource "random_password" "minio_secret_key" {
  length  = 24
  special = false
}

resource "helm_release" "minio" {
  name      = "minio"
  namespace = kubernetes_namespace.season_link.metadata.0.name

  repository = "../charts"
  chart      = "minio"
  version    = "0.1.0"

  set {
    name  = "auth.secretName"
    value = kubernetes_secret.minio_credentials.metadata.0.name
  }
}

resource "kubernetes_secret" "minio_credentials" {
  metadata {
    name      = "minio-credentials"
    namespace = kubernetes_namespace.season_link.metadata.0.name
  }

  data = {
    minio-access-key = random_password.minio_access_key.result
    minio-secret-key = random_password.minio_secret_key.result
  }
}

resource "random_password" "postgres_password_profiles" {
  length  = 16
  special = false
}

resource "helm_release" "postgresql_profiles" {
  name      = "postgresql-profiles"
  namespace = kubernetes_namespace.season_link.metadata.0.name

  repository = "https://charts.bitnami.com/bitnami"
  chart      = "postgresql"
  version    = "14.2.3"

  set {
    name  = "fullnameOverride"
    value = "postgresql-profiles"
  }

  set {
    name  = "auth.database"
    value = "profiles"
  }

  set {
    name  = "auth.username"
    value = "profiles"
  }

  set {
    name  = "auth.password"
    value = random_password.postgres_password_profiles.result
  }
}

resource "kubernetes_manifest" "application_argo_cd_profiles" {
  manifest = {
    apiVersion = "argoproj.io/v1alpha1"
    kind       = "Application"
    metadata = {
      labels = {
        name = "profiles"
      }
      name      = "profiles"
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
          releaseName = "profiles"
          valuesObject = {
            fullnameOverride = "profiles"
            keycloak = {
              auth = {
                passwordSecretName = kubernetes_secret.profiles_user_password.metadata.0.name
              }
            }
            minio = {
              auth = {
                secretName = kubernetes_secret.minio_credentials.metadata.0.name
              }
            }
          }
        }
        path           = "infra/charts/profiles"
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

