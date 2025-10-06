resource "aws_iam_role" "ECR-Permission-Role" {
  name               = "${var.project_name}/${var.environment}-ECR-Permission-Role"
  tags               = var.tags
  assume_role_policy = var.github_assume_role_policy
}

resource "aws_iam_policy" "ECR-Permission-policy" {
  name        = "${var.project_name}/${var.environment}-ECR-permissions"
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
