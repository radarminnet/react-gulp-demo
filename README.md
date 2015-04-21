# react-gulp-demo
Template for React JS project using Gulp

### Setup
First of all, you need to install [node and npm](https://nodejs.org/) and [gulp](http://gulpjs.com/). If you run into trouble during installation of gulp, make sure you are
the owner of the node_modules folder (http://stackoverflow.com/questions/16151018/npm-throws-error-without-sudo). When you are done, simply:
```
$ npm install
```

### Build
Gulp takes care of assembling the JS into a single `bundle.js` that we will load in the browser. Just type:
```
$ gulp
```
or
```
$ gulp dev
```
...to make gulp scan the `src/` folder for changes to `.html` and `.js` files and build the bundle automatically.

### Run the server
To start the server, type
```
$ node server.js
```
And access it at http://localhost:3000/