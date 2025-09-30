variable "tags" {
  description = "Tags to apply to resources"
  type        = map(string)
}

variable "project_name" {
  description = "Name prefix for resources"
  type        = string
}

variable "github_oidc_subject" {
  description = "GitHub repository subject pattern for OIDC trust (e.g. repo:Org/Repo:*)"
  type        = string
}

variable "github_oidc_arn" {
  description = "ARN of the GitHub OIDC provider"
  type        = string
}

variable "vpc_id" {
  description = "The ID of the VPC"
  type        = string
}
