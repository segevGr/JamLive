variable "tags" {
  description = "Tags to apply to resources"
  type        = map(string)
}

variable "project_name" {
  description = "Name prefix for resources"
  type        = string
}

variable "vpc_id" {
  description = "The ID of the VPC"
  type        = string
}

variable "public_subnet_ids" {
  description = "The IDs of the public subnets"
  type        = list(string)
}

variable "allow_web_traffic_sg_id" {
  description = "The ID of the security group allowing web traffic"
  type        = string
}

variable "iam_role_ecr_arn" {
  description = "The IAM role push pull arn"
  type        = string
}
