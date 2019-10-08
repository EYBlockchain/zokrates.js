compile-test:
	# docker-compose exec library node ./lib/__tests__/compile
	docker-compose exec library jest compile

setup-test:docker
	docker-compose exec library jest setup-test

export-verifier-test: 
	docker-compose exec library jest export-verifier

compute-witness-test:
	docker-compose exec library jest compute-witness

generate-proof-test:
	docker-compose exec library jest generate-proof