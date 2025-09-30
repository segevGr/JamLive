resource "tls_private_key" "self_signed_key" {
  algorithm = "RSA"
  rsa_bits  = 2048
}

resource "tls_self_signed_cert" "self_signed_cert" {
  private_key_pem = tls_private_key.self_signed_key.private_key_pem

  subject {
    common_name  = "example.local"
    organization = "Temporary Cert"
  }

  validity_period_hours = 8760
  allowed_uses = [
    "key_encipherment",
    "digital_signature",
    "server_auth"
  ]
}

resource "aws_acm_certificate" "imported_cert" {
  private_key      = tls_private_key.self_signed_key.private_key_pem
  certificate_body = tls_self_signed_cert.self_signed_cert.cert_pem
}
