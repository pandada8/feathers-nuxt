require('source-map-support/register')
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("winston");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable no-console */
var logger = __webpack_require__(0);
var app = __webpack_require__(3);
var port = app.get('port');
var server = app.listen(port);

process.on('unhandledRejection', function (reason, p) {
  return logger.error('Unhandled Rejection at: Promise ', p, reason);
});

server.on('listening', function () {
  return logger.info('Feathers application started on ' + app.get('host') + ':' + port);
});

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var path = __webpack_require__(1);
var favicon = __webpack_require__(4);
var compress = __webpack_require__(5);
var cors = __webpack_require__(6);
var helmet = __webpack_require__(7);
var bodyParser = __webpack_require__(8);

var feathers = __webpack_require__(9);
var configuration = __webpack_require__(10);
var hooks = __webpack_require__(11);
var rest = __webpack_require__(12);
var socketio = __webpack_require__(13);

var handler = __webpack_require__(14);
var notFound = __webpack_require__(15);

var middleware = __webpack_require__(16);
var services = __webpack_require__(20);
var appHooks = __webpack_require__(21);

var app = feathers();

// Load app configuration
app.configure(configuration());
// Enable CORS, security, compression, favicon and body parsing
app.use(cors());
app.use(helmet());
app.use(compress());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(favicon(path.join(app.get('public'), 'favicon.ico')));
// Host the public folder
app.use('/', feathers.static(app.get('public')));

// Set up Plugins and providers
app.configure(hooks());
app.configure(rest());
app.configure(socketio());

// Configure other middleware (see `middleware/index.js`)
app.configure(middleware);
// Set up our services (see `services/index.js`)
app.configure(services);
// Configure a middleware for 404s and the error handler
app.use(notFound());
app.use(handler());

app.hooks(appHooks);

module.exports = app;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("serve-favicon");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("compression");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("helmet");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("feathers");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("feathers-configuration");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("feathers-hooks");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("feathers-rest");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("feathers-socketio");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("feathers-errors/handler");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("feathers-errors/not-found");

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var nuxt = __webpack_require__(17);

module.exports = function () {
  var app = this;

  // Use Nuxt's render middleware
  app.use(function (req, res, next) {
    // fix the auth callback
    if (req.url.match(/^\/auth\//)) {
      next();
      return;
    }
    switch (req.accepts('html', 'json')) {
      case 'json':
        next();
        break;
      default:
        nuxt.render(req, res, next);
    }
  });
  // FIXME: find the right order to put the handler and prevent hijack the google login link
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__(18),
    Nuxt = _require.Nuxt,
    Builder = _require.Builder;

var config = __webpack_require__(19);
var logger = __webpack_require__(0);

var nuxt = new Nuxt(config);
var resolve = __webpack_require__(1).resolve;

config.dev = "development" !== 'production';

if (config.dev) {
  var builder = new Builder(nuxt);
  builder.build().then(function () {
    return process.emit('nuxt:build:done');
  }).catch(function (err) {
    logger.error(err);
    process.exit(1);
  });
} else {
  process.nextTick(function () {
    return process.emit('nuxt:build:done');
  });
}

module.exports = nuxt;

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("nuxt");

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__dirname) {var path = __webpack_require__(1);
module.exports = {
  /*
  ** Headers of the page
  */
  rootDir: path.join(__dirname),
  srcDir: path.join(__dirname, 'client'),
  head: {
    title: 'starter',
    meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }, { hid: 'description', name: 'description', content: 'Nuxt.js project' }],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
  ** Global CSS
  */
  css: ['~/assets/css/main.css'],
  /*
  ** Add axios globally
  */
  build: {
    vendor: ['axios'],
    /*
    ** Run ESLINT on save
    */
    extend: function extend(config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        });
      }
    }
  }
};
/* WEBPACK VAR INJECTION */}.call(exports, ""))

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = function () {
  var app = this; // eslint-disable-line no-unused-vars
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

// Application hooks that run for every service
var logger = __webpack_require__(22);

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [logger()],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [logger()],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

// A hook that logs service method before, after and error
var logger = __webpack_require__(0);

module.exports = function () {
  return function (hook) {
    var message = hook.type + ': ' + hook.path + ' - Method: ' + hook.method;

    if (hook.type === 'error') {
      message += ': ' + hook.error.message;
    }

    logger.info(message);
    logger.debug('hook.data', hook.data);
    logger.debug('hook.params', hook.params);

    if (hook.result) {
      logger.debug('hook.result', hook.result);
    }

    if (hook.error) {
      logger.error(hook.error);
    }
  };
};

/***/ })
/******/ ]);
//# sourceMappingURL=main.map