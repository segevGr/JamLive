output "ecr_role_arn" {
  description = "ARN of the IAM Role for ECR"
  value       = aws_iam_role.ECR-Permission-Role.arn
}
