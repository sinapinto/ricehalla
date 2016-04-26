# ricehalla

[![Build Status](https://travis-ci.org/sinapinto/ricehalla.svg?branch=master)](https://travis-ci.org/sinapinto/ricehalla)
[![Dependency Status](https://david-dm.org/sinapinto/ricehalla.svg)](https://david-dm.org/sinapinto/ricehalla)

**(WIP)** a website for sharing dotfiles..

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
* [koa](http://koajs.com/)
* [sequelize](http://docs.sequelizejs.com/en/latest/)

## Getting started

  ```sh
  $ make start
  ```

  run `make help` to see a list of options.

  open `http://localhost:3000`. Use `ctrl-h` to toggle redux devtools.

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

## License

[MIT](./LICENSE)
