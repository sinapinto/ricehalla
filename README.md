# [ricehalla](http://www.ricehalla.com)

[![Build Status](https://travis-ci.org/sinapinto/ricehalla.svg?branch=master)](https://travis-ci.org/sinapinto/ricehalla)
[![Dependency Status](https://david-dm.org/sinapinto/ricehalla.svg)](https://david-dm.org/sinapinto/ricehalla)

a website for sharing dotfiles..

---

The frontend is built using React and the backend is a Node.js server and a SQL
database.

## Core technologies

* [react](https://facebook.github.io/react/)
* [redux](https://github.com/reactjs/redux)
* [react-router](https://github.com/reactjs/react-router)
* [css modules](https://github.com/css-modules/css-modules)
* [babel](https://babeljs.io/)
* [webpack](https://webpack.github.io/)
* [eslint](http://eslint.org/)
* [koa](http://koajs.com/)
* [sequelize](http://docs.sequelizejs.com/en/latest/)

## Getting started

  Before diving in, be forewarned that the node app uses the aws-sdk which
  requires credentials, so uploading will not work unless you [setup your own
  credentials](http://docs.aws.amazon.com/AWSJavaScriptSDK/guide/node-configuring.html#Setting_AWS_Credentials).

### Install

  should work with node >= 5.0

  clone repo, `npm install`, [install a db
  driver](http://docs.sequelizejs.com/en/latest/docs/getting-started/) for
  sequelize, and probably also run `npm rebuild` for the bcrypt module.

### Configure

#### [config/index.json](./config/index.json)

  change the host, port, and APIport. `port` is the port the server should
  listen on. `APIport` is the port to make requests to. Leave APIport empty
  to not include a port number in api requests.

  set the db credentials if needed.

  update `jwt.secretOrKey` with a secret, e.g. from
  [here](https://www.grc.com/passwords.htm)

#### [config/sequelize/config.json](./config/sequelize/config.json)

  change the `dialect` options

### Development build

  ```sh
  $ make start
  ```

  run `make help` to see a list of options.

  open `http://localhost:3000`. Use `ctrl-h` to toggle redux devtools.

### Production build

  ```sh
  $ make start-pro
  ```

  note that static assets are not served by the node server in production mode.

## Implementation

The server receives a request. if the request url doesn't get matched to an api
endpoint, the server will [build an html
string](https://facebook.github.io/react/docs/top-level-api.html#reactdomserver.rendertostring)
using the client app. it also takes things like the current route and the the
presence of a valid jwt in the request's cookie into account when building the
html. the html is sent it to the browser, which renders it without needing JS.
Once the javascript is parsed and loaded in the browser, react will render,
reusing the markup from the server. From here, routing is handled by the
client, and resources will be asynchronously fetched.

having this kind of setup poses some build-step challenges that have solutions
with different tradeoffs.

**The problem:** the server executes client-side code, which `require`/`import`s
unusual things like images or css files which is made possible on the
client-side with webpack.

**solution:** Compile the server with webpack. Unfortunately,
building a server bundle slows down builds and complicates
configuration. But in return, it allows to:

1. Load assets on the server
2. Avoid having to modify code (only config stuff)
3. Prerender CSS modules on the server

The stylesheets are [CSS modules](https://github.com/css-modules/css-modules)
which get loaded by webpack. One of the benefits of using css modules is that
classes are locally scoped, so you don't need to worry about class
name clashing across files.

**The problem:** Styles need to be shared by the client and server without
relying on javascript to load (to avoid a flash of unstyled content).

**solution:** In production, webpack extracts the styles into an external CSS
file, and loads it with a `<link>` tag in the server-rendered markup.

In development, webpack loads styles into the DOM via `<style>` tags to enable
hot reloading.

## Thanks

[DanielFGray](https://github.com/DanielFGray) for providing code/advice contributions

Uncled1023 for feedback and making the original ricehalla

kori for the name

and others for feedback etc.

## License

[MIT](./LICENSE)
