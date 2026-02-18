APP_NAME := todo-app

build:
	docker build \
		--platform linux/amd64 \
		-t $(APP_NAME):latest \
		--no-cache .

run:
	docker run --name $(APP_NAME) -d -p 3000:3000 \
		--env-file .env.local.docker \
		--network todo-app_default \
		$(APP_NAME):latest

clean:
	docker rm -f $(APP_NAME)
