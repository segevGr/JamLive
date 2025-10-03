output "vpc_id" {
  description = "The ID of the VPC"
  value       = aws_vpc.vpc.id
}

output "public_subnet_ids" {
  value = [for subnet in aws_subnet.subnets : subnet.id if subnet.map_public_ip_on_launch]
}
