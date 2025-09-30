resource "aws_iam_role" "Frontend-Role" {
  name = "${var.project_name}-Frontend-Role"
  lifecycle {
    prevent_destroy = true
  }
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

resource "aws_iam_policy" "CloudFront-policy" {
  name        = "${var.project_name}-CloudFront-permissions"
  description = "CloudFront permissions"
  depends_on  = [aws_cloudfront_distribution.frontend]
  lifecycle {
    prevent_destroy = true
  }
  tags = var.tags
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "cloudfront:GetDistribution",
          "cloudfront:CreateInvalidation"
        ]
        Resource = [aws_cloudfront_distribution.frontend.arn]
      }
    ]
  })
}

resource "aws_iam_policy" "S3-policy" {
  name        = "${var.project_name}-S3-permissions"
  description = "S3 permissions"
  depends_on  = [aws_s3_bucket.frontend]
  lifecycle {
    prevent_destroy = true
  }
  tags = var.tags
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "s3:ListBucket"
        ]
        Resource = aws_s3_bucket.frontend.arn
      },
      {
        Effect = "Allow"
        Action = [
          "s3:PutObject",
          "s3:DeleteObject"
        ]
        Resource = "${aws_s3_bucket.frontend.arn}/*"
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "attach-CloudFront-policy" {
  role       = aws_iam_role.Frontend-Role.name
  policy_arn = aws_iam_policy.CloudFront-policy.arn
}

resource "aws_iam_role_policy_attachment" "attach-S3-policy" {
  role       = aws_iam_role.Frontend-Role.name
  policy_arn = aws_iam_policy.S3-policy.arn
}
