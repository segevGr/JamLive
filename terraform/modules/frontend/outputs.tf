output "s3_bucket_name" {
  description = "Name of the S3 bucket hosting the frontend"
  value       = aws_s3_bucket.this.bucket
}

output "cloudfront_distribution_id" {
  description = "ID of the CloudFront distribution"
  value       = aws_cloudfront_distribution.this.id
}

output "cloudfront_domain_name" {
  description = "Domain name of the CloudFront distribution"
  value       = aws_cloudfront_distribution.this.domain_name
}

output "frontend_role_name" {
  description = "Name of the IAM Role for frontend"
  value       = aws_iam_role.this.name
}

output "frontend_role_arn" {
  description = "ARN of the IAM Role for frontend"
  value       = aws_iam_role.this.arn
}

output "s3_policy_arn" {
  description = "ARN of the S3 policy attached to frontend role"
  value       = aws_iam_policy.S3-policy.arn
}

output "cloudfront_policy_arn" {
  description = "ARN of the CloudFront policy attached to frontend role"
  value       = aws_iam_policy.CloudFront-policy.arn
}

output "ecr_repository_url" {
  description = "URL of the ECR repository (for docker push/tag)"
  value       = aws_ecr_repository.this.repository_url
}
