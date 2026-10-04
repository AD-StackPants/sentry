.PHONY: build up down restart rebuild fastapi

build:
	docker compose build

up:
	docker compose --env-file ./server/.env up -d

down:
	docker compose down

restart: down up

rebuild: down build up

fastapi:
	uv --directory server run fastapi dev
