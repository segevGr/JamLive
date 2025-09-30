resource "aws_vpc" "vpc" {
  cidr_block           = var.vpc_cidr_block
  enable_dns_hostnames = true
  enable_dns_support   = true
  tags = merge(
    {
      Name = "${var.project_name}-vpc"
    },
    var.tags
  )
}

resource "aws_subnet" "subnets" {
  for_each = var.subnets

  vpc_id                  = aws_vpc.vpc.id
  cidr_block              = each.value.cidr_block
  availability_zone       = "${var.region}${each.value.az}"
  map_public_ip_on_launch = lookup(each.value, "public", false)

  tags = merge(
    {
      Name = each.key
    },
    var.tags
  )
}

resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.vpc.id
  tags   = var.tags
}

resource "aws_route_table" "route_table" {
  vpc_id = aws_vpc.vpc.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.igw.id
  }
  tags = var.tags
}

resource "aws_route_table_association" "associat_subnets_to_route_table" {
  for_each = {
    for name, subnet in aws_subnet.subnets :
    name => subnet.id if subnet.map_public_ip_on_launch
  }
  subnet_id      = each.value
  route_table_id = aws_route_table.route_table.id
}
