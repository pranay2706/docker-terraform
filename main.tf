provider "aws" {
  region = "us-east-1"
}

resource "aws_security_group" "terraform" {
  name        = "terraform"
  description = "Allow all inbound and outbound traffic"

  ingress {
    from_port   = 0
    to_port     = 0
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "react_app" {
  ami           = "ami-0182f373e66f89c85" 
  instance_type = "t2.micro"

  key_name = "terraform"
  vpc_security_group_ids = [aws_security_group.terraform.id] 

  tags = {
    Name = "ReactAppInstance"
  }

  user_data = <<-EOF
              #!/bin/bash
              apt update
              apt install -y docker.io
              systemctl start docker
              systemctl enable docker
              docker pull your-docker-username/reacts-app:latest
              docker run -d -p 3000:5173 your-docker-username/reacts-app:latest
              EOF
}

output "instance_public_ip" {
  value = aws_instance.react_app.public_ip
}
