install:
	npm ci
lint: 
	npx eslint .  --fix
diff-json:
	gendiff __fixtures__/file1.json __fixtures__/file2.json
diff-yaml:
	gendiff __fixtures__/file1.yaml __fixtures__/file2.yaml
test-coverage:
	npm test -- --coverage --coverageProvider=v8
test:
	npm test
rec:
	asciinema rec