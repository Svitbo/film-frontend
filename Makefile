.ONESHELL: /usr/bin/bash
.PHONY: frontend*

# Environment setup targets

node_modules:
	npm ci

# Docker Compose targets

frontend-apply-dev:
	docker compose -f compose.d/compose.yml \
		up \
		-t 3 \
		--build \
		-d

frontend-apply-prod: frontend-apply-dev

frontend-destroy-dev:
	docker compose -f compose.d/compose.yml \
		down \
		-t 3

frontend-destroy-prod: frontend-destroy-dev

frontend-logs:
	docker compose -f compose.d/compose.yml \
		-f compose.d/compose.yml \
		logs -f
