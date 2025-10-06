variable "tags" {
  description = "Tags to apply to resources"
  type        = map(string)
}

variable "project_name" {
  description = "Name prefix for resources"
  type        = string
}

variable "github_assume_role_policy" {
  description = "JSON-encoded IAM assume role policy document for GitHub OIDC provider."
  type        = string
}

variable "vpc_id" {
  description = "The ID of the VPC"
  type        = string
}
