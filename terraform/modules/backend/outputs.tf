output "backend_alb_domain" {
  description = "The domain name of the backend ALB"
  value       = aws_lb.app_alb.dns_name
}
