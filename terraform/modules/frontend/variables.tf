variable "tags" {
  description = "Tags to apply to resources"
  type        = map(string)
}

variable "project_name" {
  description = "Name prefix for resources"
  type        = string
}

variable "cloudfront_default_root_object" {
  description = "Default root object served by CloudFront (e.g. index.html)"
  type        = string
}

variable "github_assume_role_policy" {
  description = "JSON-encoded IAM assume role policy document for GitHub OIDC provider."
  type        = string
}
