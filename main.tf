# main.tf

provider "aws" {
  region = "us-east-1" # Change to your preferred region
}

resource "aws_security_group" "allow_all" {
  name        = "allow_all"
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
  ami           = "ami-0c55b159cbfafe1f0" # Change to your preferred AMI ID
  instance_type = "t2.micro" # Change instance type if needed

  key_name = "your-key-pair" # Replace with your SSH key pair name

  security_groups = [aws_security_group.allow_all.name]

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
              docker run -d -p 3000:3000 your-docker-username/reacts-app:latest
              EOF
}
