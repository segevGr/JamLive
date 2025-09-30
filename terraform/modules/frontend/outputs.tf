output "s3_bucket_name" {
  description = "Name of the S3 bucket hosting the frontend"
  value       = aws_s3_bucket.frontend.bucket
}

# output "s3_bucket_arn" {
#   description = "ARN of the S3 bucket"
#   value       = aws_s3_bucket.frontend.arn
# }

output "cloudfront_distribution_id" {
  description = "ID of the CloudFront distribution"
  value       = aws_cloudfront_distribution.frontend.id
}

output "cloudfront_domain_name" {
  description = "Domain name of the CloudFront distribution"
  value       = aws_cloudfront_distribution.frontend.domain_name
}

output "frontend_role_name" {
  description = "Name of the IAM Role for frontend"
  value       = aws_iam_role.Frontend-Role.name
}

output "frontend_role_arn" {
  description = "ARN of the IAM Role for frontend"
  value       = aws_iam_role.Frontend-Role.arn
}

output "s3_policy_arn" {
  description = "ARN of the S3 policy attached to frontend role"
  value       = aws_iam_policy.S3-policy.arn
}

output "cloudfront_policy_arn" {
  description = "ARN of the CloudFront policy attached to frontend role"
  value       = aws_iam_policy.CloudFront-policy.arn
}
