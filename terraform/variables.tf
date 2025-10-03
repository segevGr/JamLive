locals {
  common_tags = {
    author  = "Segev Grotas"
    project = "Jamlive"
  }
}

#General
variable "project_name" {
  description = "Name prefix for resources"
  type        = string
}

variable "region" {
  description = "AWS region"
  type        = string
}

#Network
variable "vpc_cidr_block" {
  description = "The CIDR block for the VPC"
  type        = string
}

variable "subnets" {
  description = "CIDR blocks for public subnets"
  type = map(object({
    cidr_block = string
    az         = string
    is_public  = bool
  }))
}

#Frontend
variable "cloudfront_default_root_object" {
  description = "Default root object served by CloudFront (e.g. index.html)"
  type        = string
}

variable "github_oidc_subject" {
  description = "GitHub repository subject pattern for OIDC trust"
  type        = string
}
