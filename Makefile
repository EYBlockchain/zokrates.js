compile-test:
	docker-compose exec library node ./lib/__test__/compile

setup-test:
	docker-compose exec library node ./lib/__test__/setup
