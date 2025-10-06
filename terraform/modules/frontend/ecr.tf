resource "aws_ecr_repository" "this" {
  name                 = "${lower(var.project_name)}/${lower(var.environment)}/frontend"
  image_tag_mutability = "MUTABLE"

  encryption_configuration {
    encryption_type = "AES256"
  }

  image_scanning_configuration {
    scan_on_push = true
  }

  tags = var.tags
}
