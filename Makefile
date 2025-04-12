
up: 
	docker compose up -d
	
bash: 
	docker compose exec app bash
	
stop: 
	docker compose stop

ps: 
	docker compose ps

stan:
	docker compose exec app vendor/bin/phpstan analyze

cs-check:
	docker compose exec app composer phpcs .

cs-fix:
	docker compose exec app composer phpcsfix .