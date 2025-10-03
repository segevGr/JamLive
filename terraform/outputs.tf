output "frontend_bucket_name" {
  description = "Name of the frontend S3 bucket"
  value       = module.frontend.s3_bucket_name
}

output "frontend_cloudfront_domain" {
  description = "Domain name of the CloudFront distribution"
  value       = "https://${module.frontend.cloudfront_domain_name}"
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

output "backend_alb_domain" {
  description = "The domain name of the backend ALB"
  value       = try("https://${module.backend[0].backend_alb_domain}", "Backend is off")
}

output "ecr_repository_url" {
  description = "URL of the ECR repository (for docker push/tag)"
  value       = module.frontend.ecr_repository_url
}
