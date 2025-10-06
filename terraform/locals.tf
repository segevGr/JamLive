locals {
  common_tags = {
    author  = "Segev Grotas"
    project = "Jamlive"
  }
}

locals {
  github_assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = {
          Federated = aws_iam_openid_connect_provider.github.arn
        }
        Action = "sts:AssumeRoleWithWebIdentity"
        Condition = {
          StringEquals = {
            "token.actions.githubusercontent.com:sub" = "repo:${var.github_oidc_subject}"
          }
        }
      }
    ]
  })
}
