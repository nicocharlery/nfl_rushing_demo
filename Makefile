build:
	docker-compose build --force-rm --no-cache
	docker-compose up -d
	docker-compose exec application mix deps.get
	docker-compose exec application sh -c 'cd /app/apps/web/assets/ && npm install'


start:
	docker-compose up -d

stop:
	docker-compose stop

server:
	docker-compose exec application iex -S mix phx.server

test:
	docker-compose exec -e MIX_ENV=test application mix test
