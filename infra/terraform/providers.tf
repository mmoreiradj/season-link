terraform {
  required_providers {
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "2.26.0"
    }

    helm = {
      source  = "hashicorp/helm"
      version = "2.12.1"
    }
  }

  backend "s3" {
    skip_region_validation      = true
    skip_credentials_validation = true
    skip_requesting_account_id  = true
    bucket                      = "mmo-terraform"
    key                         = "proxmox/k3s/season-link/terraform.tfstate"
  }

  required_version = "1.7.3"
}
