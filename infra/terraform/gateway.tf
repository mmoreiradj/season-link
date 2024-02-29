resource "kubernetes_manifest" "application_argo_cd_gateway" {
  manifest = {
    apiVersion = "argoproj.io/v1alpha1"
    kind       = "Application"
    metadata = {
      labels = {
        name = "gateway"
      }
      name      = "gateway"
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
          releaseName = "gateway"
          valuesObject = {
            fullnameOverride = "gateway"
            ingress = {
              enabled          = true
              ingressClassName = "traefik"
              hosts = [
                {
                  host = "api-season-link.ve.moreiradj.net"
                  paths = [
                    {
                      path     = "/"
                      pathType = "ImplementationSpecific"
                    }
                  ]
                }
              ]
              annotations = {
                "traefik.ingress.kubernetes.io/redirect-entry-point" = "https"
                "traefik.ingress.kubernetes.io/redirect-permanent"   = "true"
                "traefik.ingress.kubernetes.io/ssl-redirect"         = "true"
              }
            }

            keycloak = {
              issuerUri = "https://auth-season-link.ve.moreiradj.net"
              jwksUri   = "https://auth-season-link.ve.moreiradj.net/auth/realms/season-link/protocol/openid-connect/certs"
            }
          }
        }
        path           = "infra/charts/gateway"
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
