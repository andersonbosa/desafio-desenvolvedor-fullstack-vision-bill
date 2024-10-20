DOCKER_COMPOSE_FILE := ./iac/development/docker-compose.yml

dev-run:
	docker compose -f $(DOCKER_COMPOSE_FILE) up --build

dev-down:
	docker compose -f $(DOCKER_COMPOSE_FILE) down

dev: dev-down dev-run

.PHONY: dev-run dev-down dev
