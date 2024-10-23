.ONESHELL: /usr/bin/bash
.PHONY: frontend*

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
		-t 3 \
		--volumes

frontend-destroy-prod:
	docker compose -f compose.d/compose.yml \
		down \
		-t 3
