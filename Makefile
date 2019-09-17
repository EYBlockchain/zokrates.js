compile-test:
	docker-compose exec library node ./lib/__test__/compile

setup-test:
	docker-compose exec library node ./lib/__test__/setup

export-verifier-test: 
	docker-compose exec library node ./lib/__test__/export-verifier

compute-witness-test:
	docker-compose exec library node ./lib/__test__/compute-witness

generate-proof-test:
	docker-compose exec library node ./lib/__test__/generate-proof
