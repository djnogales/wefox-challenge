.PHONY = default deps build test challenge clean start-database

# Shell to use for running scripts
SHELL := $(shell which bash)
IMAGE_NAME := wefox/challenge
SERVICE_NAME := app
CHALLENGE_APP_NAME := challenge

DOCKER := $(shell command -v docker)
DOCKER_COMPOSE := $(shell command -v docker-compose)
deps:
ifndef DOCKER
	@echo "Docker is not available. Please install docker"
	@exit 1
endif
ifndef DOCKER_COMPOSE
	@echo "docker-compose is not available. Please install docker-compose"
	@exit 1
endif

default: build

build:
	docker build -t $(IMAGE_NAME):dev .

test: build
	docker-compose run --rm $(SERVICE_NAME) bash -c 'npm run test'

challenge: build
	docker-compose up $(CHALLENGE_APP_NAME) && docker-compose down

clean:
	docker-compose down --rmi local --volumes --remove-orphans

start_database:
	docker-compose up -d mongo redis
