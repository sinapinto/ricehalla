# ricewars

[![Build Status](https://travis-ci.org/sinapinto/ricewars.svg?branch=master)](https://travis-ci.org/sinapinto/ricewars)
[![Dependency Status](https://david-dm.org/sinapinto/ricewars.svg)](https://david-dm.org/sinapinto/ricewars)
[![devDependency Status](https://david-dm.org/sinapinto/ricewars/dev-status.svg)](https://david-dm.org/sinapinto/ricewars#info=devDependencies)

**(WIP)** a website for rice contests..

---

This application is rendered on both the client and server for performance,
accessibility, and SEO benefits. [Universal
Javascript](https://medium.com/@mjackson/universal-javascript-4761051b7ae9#.kexqan3d7)
makes this manageable, enabling the client and server to share code. The
frontend is built using React and the backend is a Node.js server and a SQL
database.

## Core technologies

* [react](https://facebook.github.io/react/)
* [redux](https://github.com/reactjs/redux)
* [react-router](https://github.com/reactjs/react-router)
* [css modules](https://github.com/css-modules/css-modules)
* [babel](https://babeljs.io/)
* [webpack](https://webpack.github.io/)
* [eslint](http://eslint.org/)
* [express](http://expressjs.com/)
* [sequelize](http://docs.sequelizejs.com/en/latest/)

*This project is young and in flux—new tools may be quickly added or dropped.*

## Setting up for development

- Checkout the source from github

  ```
  $ git clone git://github.com/sinapinto/ricewars.git
  $ cd ricewars
  ```

- Set up an SQL database of your choice and set the connection details in
  `src/config.js`.

  In case you choose to use something other than
  [postgres](http://www.postgresql.org/), you will need to
  also install an appropriate node.js driver:

  ```sh
  # add one of the following
  $ npm install mysql # For both mysql and mariadb dialects
  $ npm install sqlite3
  $ npm install tedious # MSSQL
  ```

- Once you have your database set up, install the node.js dependencies (requires
  node >= 4.0, check your version with `node --version`).

  ```sh
  $ npm install
  ```

- Build the two development bundles: the client-side js app and the node.js
  server (they get output to `static/dist/`).

  ```sh
  $ npm run build:dev
  ```

  *to build production bundles run `npm run build:pro` instead*

- Finally, start the development server (your db is assumed to be running)

  ```sh
  $ npm start
  ```

  You can now open `http://localhost:3000` in your browser and use the website.

  Thanks to Hot Module Replacement, writing updates to the client-side code
  while the dev server is running will trigger the app to update live without
  needing to restart the server or refresh the webpage. (For certain changes to
  code this isn't possible and a warning will appear in the console.)

  In development, you can view and manipulate the redux store using 
  [redux-devtools](https://github.com/gaearon/redux-devtools). By default the
  monitor is hidden, but its visibility can be toggled with `ctrl-h` and
  repositioned with `ctrl-q`.

## Directory layout

```
.
├── static/
│   └── dist/                  # compiled output (e.g. server.js client.js)
├── src/
│   ├── actions/               # redux action creators that trigger state updates
│   ├── components/            # React "dumb" components (unconnected to store)
│   ├── containers/            # React container components
│   ├── reducers/              # redux reducers (take in action output new state)
│   ├── server/                # entry-point for the server
│   ├── styles/                # global css
│   ├── utils/                 # misc helpers
│   ├── config.js              # settings for <head>, jwt, db, etc.
│   └── client.js              # entry-point for the client
├── test/
├── webpack/
│   ├── client.babel.js        # client webpack configuration
│   ├── postcss.js             # postcss plugin configs for webpack
│   └── server.babel.js        # server webpack configuration
└── package.json               # node dependencies, scripts, and configurations
```

## Implementation decisions

Many of the implementation decisions were made based on opinion, such as:

* CSS Modules or inline styles
* JWT or session store
* Compiling the server or using a workaround (for universal asset loading)

The ecosystem is very young and there is no absolute way of doing things.

### Why a server bundle?

**The problem:** being a universal app, the server executes client-side code.
And this client-side code `require`/`import`s unusual things like images or css
files which is made possible on the client-side with webpack.

The current solution is to compile the server with webpack. Unfortunately,
building a server bundle slows down builds and complicates configuration. But in
return, it allows to:

1. Load [any](https://webpack.github.io/docs/list-of-loaders.html) of the
   client-side assets on the server
2. Avoid having to modify code (only config stuff)
3. Prerender CSS modules on the server

### CSS

The stylesheets used in this project are [CSS
modules](https://github.com/css-modules/css-modules) which get loaded by
webpack. One of the benefits of using css modules is that classes are locally
scoped, meaning you don't need to worry about conflicting class names in
separate files.

**The problem:** Styles need to be shared by the client and server without
relying on javascript to load (to avoid a flash of unstyled content).

In production, webpack extracts the styles into an external CSS file, and loads
it with a `<link>` tag in the server-rendered markup.

In development, webpack loads styles into the DOM via `<style>` tags to enable
hot reloading.

### Why not inline styles?

Inline styles written in javascript are a popular alternative to css modules.
Some issues with inline styles include bloating the server-rendered markup
string (maybe not a huge issue once compressed) and making things like css
animations and media queries difficult.

### Third-party styles

Webpack should leave identifiers of third-party styles such as Bootstrap intact
while generating hashed identifiers for local styles. This is accomplished by
using a separate `loaders` entry to the webpack config that tests for files
ending with `.global.css` and treating them accordingly.

## License

[MIT](./LICENSE)
