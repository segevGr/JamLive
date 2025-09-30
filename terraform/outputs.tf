output "frontend_bucket_name" {
  description = "Name of the frontend S3 bucket"
  value       = module.frontend.s3_bucket_name
}

output "frontend_cloudfront_domain" {
  description = "Domain name of the CloudFront distribution"
  value       = module.frontend.cloudfront_domain_name
}

output "cloudfront_distribution_id" {
  description = "ID of the CloudFront distribution"
  value       = module.frontend.cloudfront_distribution_id
}

output "frontend_role_arn" {
  description = "ARN of the IAM Role for frontend"
  value       = module.frontend.frontend_role_arn
}

output "ecr_role_arn" {
  description = "ARN of the IAM Role for ECR"
  value       = module.security.ecr_role_arn
}
