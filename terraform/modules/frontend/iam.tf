resource "aws_iam_role" "this" {
  name               = "${var.project_name}/${var.environment}-Frontend-Role"
  tags               = var.tags
  assume_role_policy = var.github_assume_role_policy
}

resource "aws_iam_policy" "CloudFront-policy" {
  name        = "${var.project_name}/${var.environment}-CloudFront-permissions"
  description = "CloudFront permissions"
  depends_on  = [aws_cloudfront_distribution.this]
  tags        = var.tags
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "cloudfront:GetDistribution",
          "cloudfront:CreateInvalidation"
        ]
        Resource = [aws_cloudfront_distribution.this.arn]
      }
    ]
  })
}

resource "aws_iam_policy" "S3-policy" {
  name        = "${var.project_name}/${var.environment}-S3-permissions"
  description = "S3 permissions"
  depends_on  = [aws_s3_bucket.this]
  tags        = var.tags
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "s3:ListBucket"
        ]
        Resource = aws_s3_bucket.this.arn
      },
      {
        Effect = "Allow"
        Action = [
          "s3:PutObject",
          "s3:DeleteObject"
        ]
        Resource = "${aws_s3_bucket.this.arn}/*"
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "attach-CloudFront-policy" {
  role       = aws_iam_role.this.name
  policy_arn = aws_iam_policy.CloudFront-policy.arn
}

resource "aws_iam_role_policy_attachment" "attach-S3-policy" {
  role       = aws_iam_role.this.name
  policy_arn = aws_iam_policy.S3-policy.arn
}
