install:
	npm ci
lint: 
	npx eslint .  --fix
start:
	gendiff __fixtures__/file1.json __fixtures__/file2.json
test:
	npx jest