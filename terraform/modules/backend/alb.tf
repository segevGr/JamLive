resource "aws_instance" "app" {
  ami                         = "ami-0f58b397bc5c1f2e8"
  instance_type               = "t3a.small"
  subnet_id                   = var.public_subnet_ids[0]
  associate_public_ip_address = true
  security_groups             = [var.allow_web_traffic_sg_id]

  user_data = file("${path.module}/userdata.sh")

  tags = merge(
    {
      Name = "${var.project_name}/${var.environment}-backend"
    },
    var.tags
  )
}

resource "aws_lb_target_group" "app_tg" {
  name     = "${var.project_name}/${var.environment}--tg"
  port     = 80
  protocol = "HTTP"
  vpc_id   = var.vpc_id

  target_type = "instance"
  health_check {
    path                = "/health"
    matcher             = "200-499"
    interval            = 30
    healthy_threshold   = 2
    unhealthy_threshold = 2
  }

  tags = var.tags
}

resource "aws_lb_target_group_attachment" "app_attachment" {
  target_group_arn = aws_lb_target_group.app_tg.arn
  target_id        = aws_instance.app.id
  port             = 80
}

resource "aws_lb" "app_alb" {
  name               = "${var.project_name}/${var.environment}-alb"
  load_balancer_type = "application"
  security_groups    = [var.allow_web_traffic_sg_id]

  subnets = var.public_subnet_ids

  tags = var.tags
}

resource "aws_lb_listener" "http_redirect" {
  load_balancer_arn = aws_lb.app_alb.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type = "redirect"

    redirect {
      port        = "443"
      protocol    = "HTTPS"
      status_code = "HTTP_301"
    }
  }
}

resource "aws_lb_listener" "https_listener" {
  load_balancer_arn = aws_lb.app_alb.arn
  port              = 443
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-2016-08"
  certificate_arn   = aws_acm_certificate.imported_cert.arn

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.app_tg.arn
  }
}

