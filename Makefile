# versioning
VERSION = $(shell git describe --tags 2>/dev/null)
ifeq ($(VERSION),)
  VERSION = 0.0.0
endif

# env
NODE_ENV ?= development
DEBUG ?= app:*

# executables
BIN := $(shell npm bin)
WEBPACK = $(BIN)/webpack
ESLINT = $(BIN)/eslint
MOCHA = $(BIN)/mocha

# flags
WEBPACK_FLAGS ?= --config config/webpack/index.js
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

P = "\\033[36m[+]\\033[0m"

help:
	@echo
	@echo -e "  \033[1;30mricehalla v$(VERSION)\033[0m"
	@echo
	@echo -e "  \033[36mstart\033[0m - build and run the development server"
	@echo -e "   \033[36m├─ build\033[0m - build development bundles"
	@echo -e "   \033[36m└─ run\033[0m - run the development server"
	@echo -e "  \033[36mstart-pro\033[0m - build and run the production server"
	@echo -e "   \033[36m├─ build-pro\033[0m - build production bundles"
	@echo -e "   \033[36m└─ run-pro\033[0m - run the production server"
	@echo -e "  \033[36mtest\033[0m - run unit tests"
	@echo -e "  \033[36mlint\033[0m - lint source code"
	@echo

start: setup build
	@echo -e " $(P) starting development server"
	@NODE_ENV=$(NODE_ENV) DEBUG=$(DEBUG) ./bin/serve

build: setup clean
	@echo -e " $(P) building $(NODE_ENV) bundles"
	@NODE_ENV=$(NODE_ENV) $(WEBPACK) $(WEBPACK_FLAGS)

run: setup build
	@echo -e " $(P) running development server"
	@NODE_ENV=$(NODE_ENV) DEBUG=$(DEBUG) ./bin/serve

build-pro: NODE_ENV=production
build-pro: build

start-pro: NODE_ENV=production
start-pro: start

run-pro:
	@echo -e " $(P) running production server"
	@NODE_ENV=production node ./static/dist/server.js

test: storage
	@echo -e " $(P) running tests"
	@NODE_ENV=test $(MOCHA) $(MOCHA_FLAGS) $(TEST_FILES)

lint:
	@echo -e " $(P) linting $(LINT_DIRS)"
	@$(ESLINT) $(ESLINT_FLAGS) $(LINT_DIRS)

clean:
	@if [ -d static/dist ]; then \
		rm -rf static/dist; \
	fi

setup: node_modules githooks storage

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

.PHONY: help setup run build build-pro test lint clean node_module storage githooks
