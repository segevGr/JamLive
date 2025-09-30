module "frontend" {
  source                         = "./modules/frontend"
  tags                           = local.common_tags
  project_name                   = var.project_name
  cloudfront_default_root_object = var.cloudfront_default_root_object
  github_oidc_subject            = var.github_oidc_subject
  github_oidc_arn                = aws_iam_openid_connect_provider.github.arn
}

variable "deploy_backend" {
  type    = bool
  default = true
}

module "backend" {
  source          = "./modules/backend"
  count           = var.deploy_backend ? 1 : 0
  ec2_instance_id = var.ec2_instance_id
}

module "security" {
  source              = "./modules/security"
  tags                = local.common_tags
  project_name        = var.project_name
  github_oidc_subject = var.github_oidc_subject
  github_oidc_arn     = aws_iam_openid_connect_provider.github.arn
  vpc_id              = module.network.vpc_id
}

module "network" {
  source         = "./modules/network"
  tags           = local.common_tags
  project_name   = var.project_name
  region         = var.region
  vpc_cidr_block = var.vpc_cidr_block
  subnets        = var.subnets
}
