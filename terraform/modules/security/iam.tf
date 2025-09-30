resource "aws_iam_role" "ECR-Permission-Role" {
  name = "${var.project_name}-ECR-Permission-Role"
  tags = var.tags
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = {
          Federated = var.github_oidc_arn
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

resource "aws_iam_policy" "ECR-Permission-policy" {
  name        = "${var.project_name}-ECR-permissions"
  description = "ECR permissions, Push & Pull only"
  tags        = var.tags
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "ecr:GetDownloadUrlForLayer",
          "ecr:BatchGetImage",
          "ecr:CompleteLayerUpload",
          "ecr:GetAuthorizationToken",
          "ecr:UploadLayerPart",
          "ecr:InitiateLayerUpload",
          "ecr:BatchCheckLayerAvailability",
          "ecr:PutImage"
        ]
        ########## CHANGE WHEN KNOW ALL SOURCES ##########
        Resource = "*"
      },
    ]
  })
}

resource "aws_iam_role_policy_attachment" "attach-ECR-policy" {
  role       = aws_iam_role.ECR-Permission-Role.name
  policy_arn = aws_iam_policy.ECR-Permission-policy.arn
}
