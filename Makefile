build:
	npm run build

start:
	make start-backend

start-backend:
	npx start-server -s ./frontend/dist

start-frontend:
	make -C frontend start

install:
	npm ci

develop:
	make start-backend & make start-frontend