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
WEBPACK_CLIENT ?= --config config/webpack/client.babel.js
WEBPACK_SERVER ?= --config config/webpack/server.babel.js
ESLINT_FLAGS ?=
MOCHA_FLAGS ?= -r test/setup.js \
               -r babel-polyfill \
               --compilers js:babel-core/register,css:test/compiler.js \

# paths
TEST_FILES := $(shell \
  find . \
    -type f -name '*.spec.js' \
    ! \( -path './.git' -o \
    -path './node_modules' -o \
    -path './static' \) \
)

LINT_DIRS = src webpack
SERVER_PATH = ./static/dist/server.js

P = "\\033[36m[+]\\033[0m"

help:
	@echo
	@echo -e "  \033[1;30mricehalla $(VERSION)\033[0m"
	@echo
	@echo -e "  \033[36mstart\033[0m - build development bundles and run the server in watch mode"
	@echo -e "  \033[36mbuild\033[0m - build development bundles"
	@echo -e "  \033[36mrun\033[0m - run the development server"
	@echo -e "  \033[36mstart-pro\033[0m - build productino bundles and run the server"
	@echo -e "  \033[36mbuild-pro\033[0m - build production bundles"
	@echo -e "  \033[36mrun-pro\033[0m - run the production server"
	@echo -e "  \033[36mtest\033[0m - run unit tests"
	@echo -e "  \033[36mlint\033[0m - lint source code"
	@echo

start: clean setup build-watch

build-watch:
	@echo -e " $(P) building $(NODE_ENV) bundles and starting server"
	@NODE_ENV=$(NODE_ENV) DEBUG=$(DEBUG) ./bin/serve

build: clean setup build-client build-server

build-client:
	@echo -e " $(P) building $(NODE_ENV) client bundle"
	@NODE_ENV=$(NODE_ENV) DEBUG=$(DEBUG) $(WEBPACK) $(WEBPACK_CLIENT)

build-server:
	@echo -e " $(P) building $(NODE_ENV) server bundle"
	@NODE_ENV=$(NODE_ENV) DEBUG=$(DEBUG) $(WEBPACK) $(WEBPACK_SERVER)

run: setup
	@echo -e " $(P) running server"
	@NODE_ENV=$(NODE_ENV) DEBUG=$(DEBUG) node $(SERVER_PATH)

start-pro: build-pro run-pro

build-pro: NODE_ENV=production
build-pro: build

run-pro: NODE_ENV=production
run-pro: run

test: storage
	@echo -e " $(P) running tests"
	@NODE_ENV=test $(MOCHA) $(MOCHA_FLAGS) $(TEST_FILES)

lint:
	@echo -e " $(P) linting directories: $(LINT_DIRS)"
	@$(ESLINT) $(ESLINT_FLAGS) $(LINT_DIRS)

clean:
	@if [ -d static/dist ]; then \
		rm -rf static/dist; \
	fi

setup: node_modules storage githooks

node_modules:
	@if [ ! -d node_modules ]; then \
		echo -e " $(P) installing node dependencies"; \
		npm install; \
	fi

storage:
	@if [ ! -d storage ]; then \
		echo -e " $(P) making storage dir"; \
		mkdir storage; \
	fi

githooks:
	@if [ ! -e .git/hooks/pre-push ]; then \
		echo -e " $(P) installing pre-push git hook"; \
		ln -s ../../bin/pre-push .git/hooks/pre-push; \
	fi
	@if [ ! -e .git/hooks/pre-commit ]; then \
		echo -e " $(P) installing pre-commit git hook"; \
		ln -s ../../bin/pre-commit .git/hooks/pre-commit; \
	fi

.PHONY: help setup start run build start-pro build-pro run-pro
.PHONY: test lint clean node_module storage githooks
