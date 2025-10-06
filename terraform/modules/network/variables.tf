variable "tags" {
  description = "Tags to apply to resources"
  type        = map(string)
}

variable "project_name" {
  description = "Name prefix for resources"
  type        = string
}

variable "environment" {
  description = "Name of the environment (e.g., production, development)."
  type        = string
}

variable "region" {
  description = "AWS region"
  type        = string
}

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
