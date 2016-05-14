# versioning
VERSION = $(shell git describe --tags 2>/dev/null)
ifeq ($(VERSION),)
  VERSION = v0.0.0
endif

# env
NODE_ENV ?= development
DEBUG ?= app,app:*

# executables
BIN := $(shell npm bin)
WEBPACK = $(BIN)/webpack
ESLINT = $(BIN)/eslint
MOCHA = $(BIN)/mocha

# flags
WEBPACK_CLIENT_FLAGS += --config config/webpack/client.babel.js
WEBPACK_SERVER_FLAGS += --config config/webpack/server.babel.js
ESLINT_FLAGS +=
MOCHA_FLAGS += -r co-mocha \
               -r test/setup.js \
               -r babel-polyfill \
               --compilers js:babel-core/register,css:test/compiler.js \

# paths
TEST_FILES := $(shell \
  find ./test \
    -type f \
    -name '*.spec.js' \
    -path './test*' \
    | sort \
)
LINT_DIRS = src
SERVER_PATH = ./static/dist/server.js

P = "\\n\\033[36m[+]\\033[0m"

.DEFAULT_GOAL := start

help:
	@echo
	@echo -e "  \033[1;30mRicehalla $(VERSION)\033[0m"
	@echo
	@echo -e "  \033[36mstart\033[0m - build development bundles and run the server"
	@echo -e "  \033[36mbuild\033[0m - build development bundles"
	@echo -e "  \033[36mrun\033[0m - run the development server"
	@echo -e "  \033[36mstart-pro\033[0m - build production bundles and run the server"
	@echo -e "  \033[36mbuild-pro\033[0m - build production bundles"
	@echo -e "  \033[36mrun-pro\033[0m - run the production server"
	@echo -e "  \033[36mtest\033[0m - run unit tests"
	@echo -e "  \033[36mlint\033[0m - lint source code"
	@echo

start: build run

build: clean setup build-client build-server

build-client:
	@echo -e "$(P) building $(NODE_ENV) client bundle\n"
	@NODE_ENV=$(NODE_ENV) DEBUG=$(DEBUG) $(WEBPACK) $(WEBPACK_CLIENT_FLAGS)

build-server:
	@echo -e "$(P) building $(NODE_ENV) server\n"
	@NODE_ENV=$(NODE_ENV) DEBUG=$(DEBUG) $(WEBPACK) $(WEBPACK_SERVER_FLAGS)

run: setup
	@echo -e "$(P) starting server\n"
	@NODE_ENV=$(NODE_ENV) DEBUG=$(DEBUG) node $(SERVER_PATH)

start-pro: build-pro run-pro

build-pro: NODE_ENV=production
build-pro: build

run-pro: NODE_ENV=production
run-pro: run

test: storage
	@echo -e "$(P) running tests\n"
	@NODE_ENV=test $(MOCHA) $(MOCHA_FLAGS) $(TEST_FILES)

lint:
	@echo -e "$(P) linting directories: $(LINT_DIRS)\n"
	@$(ESLINT) $(ESLINT_FLAGS) $(LINT_DIRS)

clean:
	@if [ -d static/dist ]; then \
		rm -rf static/dist; \
	fi

setup: node_modules storage

node_modules:
	@if [ ! -d node_modules ]; then \
		echo -e "$(P) installing node dependencies\n"; \
		npm install; \
	fi

storage:
	@mkdir -p storage

.PHONY: help setup start run build start-pro build-pro run-pro
.PHONY: test lint clean node_modules storage
