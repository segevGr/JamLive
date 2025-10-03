output "ecr_role_arn" {
  description = "ARN of the IAM Role for ECR"
  value       = aws_iam_role.ECR-Permission-Role.arn
}

output "allow_web_traffic_sg_id" {
  description = "The ID of the security group allowing web traffic"
  value       = aws_security_group.sg_allow_web.id
}
