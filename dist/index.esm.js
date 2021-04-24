import 'koishi-adapter-onebot';
import 'koishi-plugin-puppeteer';
import { User } from 'koishi-core';
import dayjs from 'dayjs';
import * as querystring from 'querystring';
import { segment } from 'koishi';
import { renderToString } from 'react-dom/server';
import * as React from 'react';
import path from 'path';
import sass from 'node-sass';
import marked from 'marked';
import hljs from 'highlight.js';
import { decode } from 'html-entities';
import util from 'util';
import stream from 'stream';
import zlib from 'zlib';
import assert from 'assert';
import buffer from 'buffer';
import crypto from 'crypto';

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]);

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

const rnds8Pool = new Uint8Array(256); // # of random values to pre-allocate

let poolPtr = rnds8Pool.length;
function rng() {
  if (poolPtr > rnds8Pool.length - 16) {
    crypto.randomFillSync(rnds8Pool);
    poolPtr = 0;
  }

  return rnds8Pool.slice(poolPtr, poolPtr += 16);
}

var REGEX = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;

function validate(uuid) {
  return typeof uuid === 'string' && REGEX.test(uuid);
}

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */

const byteToHex = [];

for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).substr(1));
}

function stringify(arr, offset = 0) {
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  const uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!validate(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

function v4(options, buf, offset) {
  options = options || {};
  const rnds = options.random || (options.rng || rng)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return stringify(rnds);
}

var MsgTool = /*#__PURE__*/function () {
  function MsgTool() {
    _classCallCheck(this, MsgTool);
  }

  _createClass(MsgTool, [{
    key: "at",
    value: function at(id) {
      return segment('at', {
        id: id
      });
    }
  }, {
    key: "atMe",
    value: function atMe(session) {
      var _session$author$userI, _session$author;

      return segment('at', {
        id: (_session$author$userI = session === null || session === void 0 ? void 0 : (_session$author = session.author) === null || _session$author === void 0 ? void 0 : _session$author.userId) !== null && _session$author$userI !== void 0 ? _session$author$userI : ''
      });
    }
  }, {
    key: "img",
    value: function img(url) {
      return segment('image', {
        url: url
      });
    }
  }]);

  return MsgTool;
}();

var msgTool = new MsgTool();

var userTool = {
  getUserFromStr: function getUserFromStr(ctx, uStr) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var splits, _splits, type, id, u;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              splits = uStr.split(':');
              _splits = _slicedToArray(splits, 2), type = _splits[0], id = _splits[1];
              _context.next = 4;
              return ctx.database.getUser(type, id);

            case 4:
              u = _context.sent;

              if (!(u === undefined)) {
                _context.next = 11;
                break;
              }

              _context.next = 8;
              return ctx.database.createUser(type, id, {
                todos: []
              });

            case 8:
              _context.next = 10;
              return ctx.database.getUser(type, id);

            case 10:
              u = _context.sent;

            case 11:
              return _context.abrupt("return", u);

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  }
};

var RenderTool = /*#__PURE__*/function () {
  function RenderTool() {
    _classCallCheck(this, RenderTool);

    this.styles = {};
    this.defaultStyles = {};
  }

  _createClass(RenderTool, [{
    key: "pushStyle",
    value: function pushStyle(id) {
      for (var _len = arguments.length, pathSegments = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        pathSegments[_key - 1] = arguments[_key];
      }

      this.styles[id] = pathSegments;
      return this;
    }
  }, {
    key: "renderStyles",
    value: function renderStyles() {
      var stylesStr = '';

      var styles = _objectSpread2(_objectSpread2({}, this.styles), this.defaultStyles);

      for (var id in styles) {
        stylesStr += "<style>".concat(sass.renderSync({
          file: path.resolve.apply(path, _toConsumableArray(styles[id]))
        }).css.toString(), "</style>");
      }

      return stylesStr;
    }
  }, {
    key: "clearStyle",
    value: function clearStyle() {
      this.styles = {};
      return this;
    }
  }]);

  return RenderTool;
}();

var renderTool = new RenderTool();

marked.setOptions({
    highlight(code, lang, callback) {
        if (lang !== '') {
            return hljs.highlight(code, { language: lang }).value;
        }
        return hljs.highlightAuto(code).value;
    },
    pedantic: false,
    gfm: true,
    breaks: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    xhtml: false
});
const TodoCard = ({ todo }) => {
    renderTool.pushStyle('github-highlight', process.cwd(), './node_modules/highlight.js/scss/nord.scss');
    renderTool.pushStyle('todo-card', __dirname, './todo-card.module.scss');
    return (React.createElement("div", { className: "todo-card" },
        React.createElement("h2", { className: "title" },
            React.createElement("span", { className: "status" }, todo.status === 'processing' ? '❎' : '✅'),
            React.createElement("span", { className: "el-tag el-tag--success" }, todo.id)),
        React.createElement("h2", { className: "title" }, todo.name),
        todo.tags.length > 0 &&
            React.createElement("h3", null, todo.tags.map((tag, index) => React.createElement("span", { key: index, className: "el-tag" }, tag))),
        React.createElement("h3", null, "\u4ECB\u7ECD"),
        React.createElement("div", { className: "desc markdown-body", dangerouslySetInnerHTML: {
                __html: marked(decode(todo?.desc ?? '未描述内容'))
            } }),
        React.createElement("div", { className: "designator" },
            React.createElement("h3", null, "\u6307\u6D3E\u4EBA"),
            React.createElement("span", { className: "content" },
                todo.designator?.qq ?
                    React.createElement("img", { className: "avatar", src: `http://q.qlogo.cn/headimg_dl?dst_uin=${todo.designator?.qq}&spec=640`, alt: "" }) : '',
                React.createElement("span", { className: "el-tag" }, todo.designator?.qq ?? '无指派人'))),
        React.createElement("div", { className: "datetime" }, dayjs(todo.ctime).format('YYYY-MM-DD HH:mm:ss'))));
};

const StaticTodos = ({ todos }) => {
    renderTool.pushStyle('static-todos', __dirname, './static-todos.module.scss');
    const sumTodos = todos.length;
    const getStatusTodos = (status) => todos.filter(todo => todo.status === status);
    const finishedTodos = getStatusTodos('finished');
    return (React.createElement("div", { className: "staticTodosTemplate" },
        React.createElement("h1", null,
            "\u5171",
            sumTodos,
            "\uD83D\uDCDD"),
        React.createElement("h2", null,
            React.createElement("label", null,
                "\u5F53\u524D\u8FDB\u5EA6 ",
                finishedTodos.length,
                " / ",
                sumTodos),
            React.createElement("div", { className: "bar" },
                React.createElement("div", { className: "cur-process", style: {
                        width: `${finishedTodos.length / sumTodos * 100}%`
                    } }))),
        todos.map(todo => React.createElement(TodoCard, { key: todo.id, todo: todo }))));
};

const registerTodosRoutes = (ctx) => {
    const koaRouter = ctx.app.router;
    koaRouter.use(async (koaCtx, next) => {
        if (/^\/work\/.*/.test(koaCtx.path)) {
            let content = await next();
            if (content.$$typeof === Symbol.for('react.element')) {
                content = renderToString(content);
                koaCtx.body = `
          <head>
            <title></title>
            ${renderTool.renderStyles()}
          </head>
          ${content}
        `;
                renderTool.clearStyle();
            }
        }
        else {
            return await next();
        }
    });
    koaRouter.get('/work/:qqNum/todos/:tag', async (koaCtx, next) => {
        const u = await userTool.getUserFromStr(ctx, `onebot:${parseInt(koaCtx.params.qqNum)}`);
        const todos = listTodos(u.todos, koaCtx.params.tag, koaCtx.query);
        renderTool.defaultStyles = {
            'label': [__dirname, '../static/label.scss'],
            'element': [__dirname, '../static/element.scss'],
            'github-md': [__dirname, '../static/github-markdown.scss']
        };
        return (React.createElement("body", { style: {
                width: '800px'
            } },
            React.createElement(StaticTodos, { todos: todos })));
    });
};

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var chunkstream = createCommonjsModule(function (module) {




let ChunkStream = (module.exports = function () {
  stream.call(this);

  this._buffers = [];
  this._buffered = 0;

  this._reads = [];
  this._paused = false;

  this._encoding = "utf8";
  this.writable = true;
});
util.inherits(ChunkStream, stream);

ChunkStream.prototype.read = function (length, callback) {
  this._reads.push({
    length: Math.abs(length), // if length < 0 then at most this length
    allowLess: length < 0,
    func: callback,
  });

  process.nextTick(
    function () {
      this._process();

      // its paused and there is not enought data then ask for more
      if (this._paused && this._reads && this._reads.length > 0) {
        this._paused = false;

        this.emit("drain");
      }
    }.bind(this)
  );
};

ChunkStream.prototype.write = function (data, encoding) {
  if (!this.writable) {
    this.emit("error", new Error("Stream not writable"));
    return false;
  }

  let dataBuffer;
  if (Buffer.isBuffer(data)) {
    dataBuffer = data;
  } else {
    dataBuffer = Buffer.from(data, encoding || this._encoding);
  }

  this._buffers.push(dataBuffer);
  this._buffered += dataBuffer.length;

  this._process();

  // ok if there are no more read requests
  if (this._reads && this._reads.length === 0) {
    this._paused = true;
  }

  return this.writable && !this._paused;
};

ChunkStream.prototype.end = function (data, encoding) {
  if (data) {
    this.write(data, encoding);
  }

  this.writable = false;

  // already destroyed
  if (!this._buffers) {
    return;
  }

  // enqueue or handle end
  if (this._buffers.length === 0) {
    this._end();
  } else {
    this._buffers.push(null);
    this._process();
  }
};

ChunkStream.prototype.destroySoon = ChunkStream.prototype.end;

ChunkStream.prototype._end = function () {
  if (this._reads.length > 0) {
    this.emit("error", new Error("Unexpected end of input"));
  }

  this.destroy();
};

ChunkStream.prototype.destroy = function () {
  if (!this._buffers) {
    return;
  }

  this.writable = false;
  this._reads = null;
  this._buffers = null;

  this.emit("close");
};

ChunkStream.prototype._processReadAllowingLess = function (read) {
  // ok there is any data so that we can satisfy this request
  this._reads.shift(); // == read

  // first we need to peek into first buffer
  let smallerBuf = this._buffers[0];

  // ok there is more data than we need
  if (smallerBuf.length > read.length) {
    this._buffered -= read.length;
    this._buffers[0] = smallerBuf.slice(read.length);

    read.func.call(this, smallerBuf.slice(0, read.length));
  } else {
    // ok this is less than maximum length so use it all
    this._buffered -= smallerBuf.length;
    this._buffers.shift(); // == smallerBuf

    read.func.call(this, smallerBuf);
  }
};

ChunkStream.prototype._processRead = function (read) {
  this._reads.shift(); // == read

  let pos = 0;
  let count = 0;
  let data = Buffer.alloc(read.length);

  // create buffer for all data
  while (pos < read.length) {
    let buf = this._buffers[count++];
    let len = Math.min(buf.length, read.length - pos);

    buf.copy(data, pos, 0, len);
    pos += len;

    // last buffer wasn't used all so just slice it and leave
    if (len !== buf.length) {
      this._buffers[--count] = buf.slice(len);
    }
  }

  // remove all used buffers
  if (count > 0) {
    this._buffers.splice(0, count);
  }

  this._buffered -= read.length;

  read.func.call(this, data);
};

ChunkStream.prototype._process = function () {
  try {
    // as long as there is any data and read requests
    while (this._buffered > 0 && this._reads && this._reads.length > 0) {
      let read = this._reads[0];

      // read any data (but no more than length)
      if (read.allowLess) {
        this._processReadAllowingLess(read);
      } else if (this._buffered >= read.length) {
        // ok we can meet some expectations

        this._processRead(read);
      } else {
        // not enought data to satisfy first request in queue
        // so we need to wait for more
        break;
      }
    }

    if (this._buffers && !this.writable) {
      this._end();
    }
  } catch (ex) {
    this.emit("error", ex);
  }
};
});

// Adam 7
//   0 1 2 3 4 5 6 7
// 0 x 6 4 6 x 6 4 6
// 1 7 7 7 7 7 7 7 7
// 2 5 6 5 6 5 6 5 6
// 3 7 7 7 7 7 7 7 7
// 4 3 6 4 6 3 6 4 6
// 5 7 7 7 7 7 7 7 7
// 6 5 6 5 6 5 6 5 6
// 7 7 7 7 7 7 7 7 7

let imagePasses = [
  {
    // pass 1 - 1px
    x: [0],
    y: [0],
  },
  {
    // pass 2 - 1px
    x: [4],
    y: [0],
  },
  {
    // pass 3 - 2px
    x: [0, 4],
    y: [4],
  },
  {
    // pass 4 - 4px
    x: [2, 6],
    y: [0, 4],
  },
  {
    // pass 5 - 8px
    x: [0, 2, 4, 6],
    y: [2, 6],
  },
  {
    // pass 6 - 16px
    x: [1, 3, 5, 7],
    y: [0, 2, 4, 6],
  },
  {
    // pass 7 - 32px
    x: [0, 1, 2, 3, 4, 5, 6, 7],
    y: [1, 3, 5, 7],
  },
];

var getImagePasses = function (width, height) {
  let images = [];
  let xLeftOver = width % 8;
  let yLeftOver = height % 8;
  let xRepeats = (width - xLeftOver) / 8;
  let yRepeats = (height - yLeftOver) / 8;
  for (let i = 0; i < imagePasses.length; i++) {
    let pass = imagePasses[i];
    let passWidth = xRepeats * pass.x.length;
    let passHeight = yRepeats * pass.y.length;
    for (let j = 0; j < pass.x.length; j++) {
      if (pass.x[j] < xLeftOver) {
        passWidth++;
      } else {
        break;
      }
    }
    for (let j = 0; j < pass.y.length; j++) {
      if (pass.y[j] < yLeftOver) {
        passHeight++;
      } else {
        break;
      }
    }
    if (passWidth > 0 && passHeight > 0) {
      images.push({ width: passWidth, height: passHeight, index: i });
    }
  }
  return images;
};

var getInterlaceIterator = function (width) {
  return function (x, y, pass) {
    let outerXLeftOver = x % imagePasses[pass].x.length;
    let outerX =
      ((x - outerXLeftOver) / imagePasses[pass].x.length) * 8 +
      imagePasses[pass].x[outerXLeftOver];
    let outerYLeftOver = y % imagePasses[pass].y.length;
    let outerY =
      ((y - outerYLeftOver) / imagePasses[pass].y.length) * 8 +
      imagePasses[pass].y[outerYLeftOver];
    return outerX * 4 + outerY * width * 4;
  };
};

var interlace = {
	getImagePasses: getImagePasses,
	getInterlaceIterator: getInterlaceIterator
};

var paethPredictor = function paethPredictor(left, above, upLeft) {
  let paeth = left + above - upLeft;
  let pLeft = Math.abs(paeth - left);
  let pAbove = Math.abs(paeth - above);
  let pUpLeft = Math.abs(paeth - upLeft);

  if (pLeft <= pAbove && pLeft <= pUpLeft) {
    return left;
  }
  if (pAbove <= pUpLeft) {
    return above;
  }
  return upLeft;
};

var filterParse = createCommonjsModule(function (module) {




function getByteWidth(width, bpp, depth) {
  let byteWidth = width * bpp;
  if (depth !== 8) {
    byteWidth = Math.ceil(byteWidth / (8 / depth));
  }
  return byteWidth;
}

let Filter = (module.exports = function (bitmapInfo, dependencies) {
  let width = bitmapInfo.width;
  let height = bitmapInfo.height;
  let interlace$1 = bitmapInfo.interlace;
  let bpp = bitmapInfo.bpp;
  let depth = bitmapInfo.depth;

  this.read = dependencies.read;
  this.write = dependencies.write;
  this.complete = dependencies.complete;

  this._imageIndex = 0;
  this._images = [];
  if (interlace$1) {
    let passes = interlace.getImagePasses(width, height);
    for (let i = 0; i < passes.length; i++) {
      this._images.push({
        byteWidth: getByteWidth(passes[i].width, bpp, depth),
        height: passes[i].height,
        lineIndex: 0,
      });
    }
  } else {
    this._images.push({
      byteWidth: getByteWidth(width, bpp, depth),
      height: height,
      lineIndex: 0,
    });
  }

  // when filtering the line we look at the pixel to the left
  // the spec also says it is done on a byte level regardless of the number of pixels
  // so if the depth is byte compatible (8 or 16) we subtract the bpp in order to compare back
  // a pixel rather than just a different byte part. However if we are sub byte, we ignore.
  if (depth === 8) {
    this._xComparison = bpp;
  } else if (depth === 16) {
    this._xComparison = bpp * 2;
  } else {
    this._xComparison = 1;
  }
});

Filter.prototype.start = function () {
  this.read(
    this._images[this._imageIndex].byteWidth + 1,
    this._reverseFilterLine.bind(this)
  );
};

Filter.prototype._unFilterType1 = function (
  rawData,
  unfilteredLine,
  byteWidth
) {
  let xComparison = this._xComparison;
  let xBiggerThan = xComparison - 1;

  for (let x = 0; x < byteWidth; x++) {
    let rawByte = rawData[1 + x];
    let f1Left = x > xBiggerThan ? unfilteredLine[x - xComparison] : 0;
    unfilteredLine[x] = rawByte + f1Left;
  }
};

Filter.prototype._unFilterType2 = function (
  rawData,
  unfilteredLine,
  byteWidth
) {
  let lastLine = this._lastLine;

  for (let x = 0; x < byteWidth; x++) {
    let rawByte = rawData[1 + x];
    let f2Up = lastLine ? lastLine[x] : 0;
    unfilteredLine[x] = rawByte + f2Up;
  }
};

Filter.prototype._unFilterType3 = function (
  rawData,
  unfilteredLine,
  byteWidth
) {
  let xComparison = this._xComparison;
  let xBiggerThan = xComparison - 1;
  let lastLine = this._lastLine;

  for (let x = 0; x < byteWidth; x++) {
    let rawByte = rawData[1 + x];
    let f3Up = lastLine ? lastLine[x] : 0;
    let f3Left = x > xBiggerThan ? unfilteredLine[x - xComparison] : 0;
    let f3Add = Math.floor((f3Left + f3Up) / 2);
    unfilteredLine[x] = rawByte + f3Add;
  }
};

Filter.prototype._unFilterType4 = function (
  rawData,
  unfilteredLine,
  byteWidth
) {
  let xComparison = this._xComparison;
  let xBiggerThan = xComparison - 1;
  let lastLine = this._lastLine;

  for (let x = 0; x < byteWidth; x++) {
    let rawByte = rawData[1 + x];
    let f4Up = lastLine ? lastLine[x] : 0;
    let f4Left = x > xBiggerThan ? unfilteredLine[x - xComparison] : 0;
    let f4UpLeft = x > xBiggerThan && lastLine ? lastLine[x - xComparison] : 0;
    let f4Add = paethPredictor(f4Left, f4Up, f4UpLeft);
    unfilteredLine[x] = rawByte + f4Add;
  }
};

Filter.prototype._reverseFilterLine = function (rawData) {
  let filter = rawData[0];
  let unfilteredLine;
  let currentImage = this._images[this._imageIndex];
  let byteWidth = currentImage.byteWidth;

  if (filter === 0) {
    unfilteredLine = rawData.slice(1, byteWidth + 1);
  } else {
    unfilteredLine = Buffer.alloc(byteWidth);

    switch (filter) {
      case 1:
        this._unFilterType1(rawData, unfilteredLine, byteWidth);
        break;
      case 2:
        this._unFilterType2(rawData, unfilteredLine, byteWidth);
        break;
      case 3:
        this._unFilterType3(rawData, unfilteredLine, byteWidth);
        break;
      case 4:
        this._unFilterType4(rawData, unfilteredLine, byteWidth);
        break;
      default:
        throw new Error("Unrecognised filter type - " + filter);
    }
  }

  this.write(unfilteredLine);

  currentImage.lineIndex++;
  if (currentImage.lineIndex >= currentImage.height) {
    this._lastLine = null;
    this._imageIndex++;
    currentImage = this._images[this._imageIndex];
  } else {
    this._lastLine = unfilteredLine;
  }

  if (currentImage) {
    // read, using the byte width that may be from the new current image
    this.read(currentImage.byteWidth + 1, this._reverseFilterLine.bind(this));
  } else {
    this._lastLine = null;
    this.complete();
  }
};
});

var filterParseAsync = createCommonjsModule(function (module) {





let FilterAsync = (module.exports = function (bitmapInfo) {
  chunkstream.call(this);

  let buffers = [];
  let that = this;
  this._filter = new filterParse(bitmapInfo, {
    read: this.read.bind(this),
    write: function (buffer) {
      buffers.push(buffer);
    },
    complete: function () {
      that.emit("complete", Buffer.concat(buffers));
    },
  });

  this._filter.start();
});
util.inherits(FilterAsync, chunkstream);
});

var constants = {
  PNG_SIGNATURE: [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a],

  TYPE_IHDR: 0x49484452,
  TYPE_IEND: 0x49454e44,
  TYPE_IDAT: 0x49444154,
  TYPE_PLTE: 0x504c5445,
  TYPE_tRNS: 0x74524e53, // eslint-disable-line camelcase
  TYPE_gAMA: 0x67414d41, // eslint-disable-line camelcase

  // color-type bits
  COLORTYPE_GRAYSCALE: 0,
  COLORTYPE_PALETTE: 1,
  COLORTYPE_COLOR: 2,
  COLORTYPE_ALPHA: 4, // e.g. grayscale and alpha

  // color-type combinations
  COLORTYPE_PALETTE_COLOR: 3,
  COLORTYPE_COLOR_ALPHA: 6,

  COLORTYPE_TO_BPP_MAP: {
    0: 1,
    2: 3,
    3: 1,
    4: 2,
    6: 4,
  },

  GAMMA_DIVISION: 100000,
};

var crc = createCommonjsModule(function (module) {

let crcTable = [];

(function () {
  for (let i = 0; i < 256; i++) {
    let currentCrc = i;
    for (let j = 0; j < 8; j++) {
      if (currentCrc & 1) {
        currentCrc = 0xedb88320 ^ (currentCrc >>> 1);
      } else {
        currentCrc = currentCrc >>> 1;
      }
    }
    crcTable[i] = currentCrc;
  }
})();

let CrcCalculator = (module.exports = function () {
  this._crc = -1;
});

CrcCalculator.prototype.write = function (data) {
  for (let i = 0; i < data.length; i++) {
    this._crc = crcTable[(this._crc ^ data[i]) & 0xff] ^ (this._crc >>> 8);
  }
  return true;
};

CrcCalculator.prototype.crc32 = function () {
  return this._crc ^ -1;
};

CrcCalculator.crc32 = function (buf) {
  let crc = -1;
  for (let i = 0; i < buf.length; i++) {
    crc = crcTable[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  }
  return crc ^ -1;
};
});

var parser = createCommonjsModule(function (module) {




let Parser = (module.exports = function (options, dependencies) {
  this._options = options;
  options.checkCRC = options.checkCRC !== false;

  this._hasIHDR = false;
  this._hasIEND = false;
  this._emittedHeadersFinished = false;

  // input flags/metadata
  this._palette = [];
  this._colorType = 0;

  this._chunks = {};
  this._chunks[constants.TYPE_IHDR] = this._handleIHDR.bind(this);
  this._chunks[constants.TYPE_IEND] = this._handleIEND.bind(this);
  this._chunks[constants.TYPE_IDAT] = this._handleIDAT.bind(this);
  this._chunks[constants.TYPE_PLTE] = this._handlePLTE.bind(this);
  this._chunks[constants.TYPE_tRNS] = this._handleTRNS.bind(this);
  this._chunks[constants.TYPE_gAMA] = this._handleGAMA.bind(this);

  this.read = dependencies.read;
  this.error = dependencies.error;
  this.metadata = dependencies.metadata;
  this.gamma = dependencies.gamma;
  this.transColor = dependencies.transColor;
  this.palette = dependencies.palette;
  this.parsed = dependencies.parsed;
  this.inflateData = dependencies.inflateData;
  this.finished = dependencies.finished;
  this.simpleTransparency = dependencies.simpleTransparency;
  this.headersFinished = dependencies.headersFinished || function () {};
});

Parser.prototype.start = function () {
  this.read(constants.PNG_SIGNATURE.length, this._parseSignature.bind(this));
};

Parser.prototype._parseSignature = function (data) {
  let signature = constants.PNG_SIGNATURE;

  for (let i = 0; i < signature.length; i++) {
    if (data[i] !== signature[i]) {
      this.error(new Error("Invalid file signature"));
      return;
    }
  }
  this.read(8, this._parseChunkBegin.bind(this));
};

Parser.prototype._parseChunkBegin = function (data) {
  // chunk content length
  let length = data.readUInt32BE(0);

  // chunk type
  let type = data.readUInt32BE(4);
  let name = "";
  for (let i = 4; i < 8; i++) {
    name += String.fromCharCode(data[i]);
  }

  //console.log('chunk ', name, length);

  // chunk flags
  let ancillary = Boolean(data[4] & 0x20); // or critical
  //    priv = Boolean(data[5] & 0x20), // or public
  //    safeToCopy = Boolean(data[7] & 0x20); // or unsafe

  if (!this._hasIHDR && type !== constants.TYPE_IHDR) {
    this.error(new Error("Expected IHDR on beggining"));
    return;
  }

  this._crc = new crc();
  this._crc.write(Buffer.from(name));

  if (this._chunks[type]) {
    return this._chunks[type](length);
  }

  if (!ancillary) {
    this.error(new Error("Unsupported critical chunk type " + name));
    return;
  }

  this.read(length + 4, this._skipChunk.bind(this));
};

Parser.prototype._skipChunk = function (/*data*/) {
  this.read(8, this._parseChunkBegin.bind(this));
};

Parser.prototype._handleChunkEnd = function () {
  this.read(4, this._parseChunkEnd.bind(this));
};

Parser.prototype._parseChunkEnd = function (data) {
  let fileCrc = data.readInt32BE(0);
  let calcCrc = this._crc.crc32();

  // check CRC
  if (this._options.checkCRC && calcCrc !== fileCrc) {
    this.error(new Error("Crc error - " + fileCrc + " - " + calcCrc));
    return;
  }

  if (!this._hasIEND) {
    this.read(8, this._parseChunkBegin.bind(this));
  }
};

Parser.prototype._handleIHDR = function (length) {
  this.read(length, this._parseIHDR.bind(this));
};
Parser.prototype._parseIHDR = function (data) {
  this._crc.write(data);

  let width = data.readUInt32BE(0);
  let height = data.readUInt32BE(4);
  let depth = data[8];
  let colorType = data[9]; // bits: 1 palette, 2 color, 4 alpha
  let compr = data[10];
  let filter = data[11];
  let interlace = data[12];

  // console.log('    width', width, 'height', height,
  //     'depth', depth, 'colorType', colorType,
  //     'compr', compr, 'filter', filter, 'interlace', interlace
  // );

  if (
    depth !== 8 &&
    depth !== 4 &&
    depth !== 2 &&
    depth !== 1 &&
    depth !== 16
  ) {
    this.error(new Error("Unsupported bit depth " + depth));
    return;
  }
  if (!(colorType in constants.COLORTYPE_TO_BPP_MAP)) {
    this.error(new Error("Unsupported color type"));
    return;
  }
  if (compr !== 0) {
    this.error(new Error("Unsupported compression method"));
    return;
  }
  if (filter !== 0) {
    this.error(new Error("Unsupported filter method"));
    return;
  }
  if (interlace !== 0 && interlace !== 1) {
    this.error(new Error("Unsupported interlace method"));
    return;
  }

  this._colorType = colorType;

  let bpp = constants.COLORTYPE_TO_BPP_MAP[this._colorType];

  this._hasIHDR = true;

  this.metadata({
    width: width,
    height: height,
    depth: depth,
    interlace: Boolean(interlace),
    palette: Boolean(colorType & constants.COLORTYPE_PALETTE),
    color: Boolean(colorType & constants.COLORTYPE_COLOR),
    alpha: Boolean(colorType & constants.COLORTYPE_ALPHA),
    bpp: bpp,
    colorType: colorType,
  });

  this._handleChunkEnd();
};

Parser.prototype._handlePLTE = function (length) {
  this.read(length, this._parsePLTE.bind(this));
};
Parser.prototype._parsePLTE = function (data) {
  this._crc.write(data);

  let entries = Math.floor(data.length / 3);
  // console.log('Palette:', entries);

  for (let i = 0; i < entries; i++) {
    this._palette.push([data[i * 3], data[i * 3 + 1], data[i * 3 + 2], 0xff]);
  }

  this.palette(this._palette);

  this._handleChunkEnd();
};

Parser.prototype._handleTRNS = function (length) {
  this.simpleTransparency();
  this.read(length, this._parseTRNS.bind(this));
};
Parser.prototype._parseTRNS = function (data) {
  this._crc.write(data);

  // palette
  if (this._colorType === constants.COLORTYPE_PALETTE_COLOR) {
    if (this._palette.length === 0) {
      this.error(new Error("Transparency chunk must be after palette"));
      return;
    }
    if (data.length > this._palette.length) {
      this.error(new Error("More transparent colors than palette size"));
      return;
    }
    for (let i = 0; i < data.length; i++) {
      this._palette[i][3] = data[i];
    }
    this.palette(this._palette);
  }

  // for colorType 0 (grayscale) and 2 (rgb)
  // there might be one gray/color defined as transparent
  if (this._colorType === constants.COLORTYPE_GRAYSCALE) {
    // grey, 2 bytes
    this.transColor([data.readUInt16BE(0)]);
  }
  if (this._colorType === constants.COLORTYPE_COLOR) {
    this.transColor([
      data.readUInt16BE(0),
      data.readUInt16BE(2),
      data.readUInt16BE(4),
    ]);
  }

  this._handleChunkEnd();
};

Parser.prototype._handleGAMA = function (length) {
  this.read(length, this._parseGAMA.bind(this));
};
Parser.prototype._parseGAMA = function (data) {
  this._crc.write(data);
  this.gamma(data.readUInt32BE(0) / constants.GAMMA_DIVISION);

  this._handleChunkEnd();
};

Parser.prototype._handleIDAT = function (length) {
  if (!this._emittedHeadersFinished) {
    this._emittedHeadersFinished = true;
    this.headersFinished();
  }
  this.read(-length, this._parseIDAT.bind(this, length));
};
Parser.prototype._parseIDAT = function (length, data) {
  this._crc.write(data);

  if (
    this._colorType === constants.COLORTYPE_PALETTE_COLOR &&
    this._palette.length === 0
  ) {
    throw new Error("Expected palette not found");
  }

  this.inflateData(data);
  let leftOverLength = length - data.length;

  if (leftOverLength > 0) {
    this._handleIDAT(leftOverLength);
  } else {
    this._handleChunkEnd();
  }
};

Parser.prototype._handleIEND = function (length) {
  this.read(length, this._parseIEND.bind(this));
};
Parser.prototype._parseIEND = function (data) {
  this._crc.write(data);

  this._hasIEND = true;
  this._handleChunkEnd();

  if (this.finished) {
    this.finished();
  }
};
});

let pixelBppMapper = [
  // 0 - dummy entry
  function () {},

  // 1 - L
  // 0: 0, 1: 0, 2: 0, 3: 0xff
  function (pxData, data, pxPos, rawPos) {
    if (rawPos === data.length) {
      throw new Error("Ran out of data");
    }

    let pixel = data[rawPos];
    pxData[pxPos] = pixel;
    pxData[pxPos + 1] = pixel;
    pxData[pxPos + 2] = pixel;
    pxData[pxPos + 3] = 0xff;
  },

  // 2 - LA
  // 0: 0, 1: 0, 2: 0, 3: 1
  function (pxData, data, pxPos, rawPos) {
    if (rawPos + 1 >= data.length) {
      throw new Error("Ran out of data");
    }

    let pixel = data[rawPos];
    pxData[pxPos] = pixel;
    pxData[pxPos + 1] = pixel;
    pxData[pxPos + 2] = pixel;
    pxData[pxPos + 3] = data[rawPos + 1];
  },

  // 3 - RGB
  // 0: 0, 1: 1, 2: 2, 3: 0xff
  function (pxData, data, pxPos, rawPos) {
    if (rawPos + 2 >= data.length) {
      throw new Error("Ran out of data");
    }

    pxData[pxPos] = data[rawPos];
    pxData[pxPos + 1] = data[rawPos + 1];
    pxData[pxPos + 2] = data[rawPos + 2];
    pxData[pxPos + 3] = 0xff;
  },

  // 4 - RGBA
  // 0: 0, 1: 1, 2: 2, 3: 3
  function (pxData, data, pxPos, rawPos) {
    if (rawPos + 3 >= data.length) {
      throw new Error("Ran out of data");
    }

    pxData[pxPos] = data[rawPos];
    pxData[pxPos + 1] = data[rawPos + 1];
    pxData[pxPos + 2] = data[rawPos + 2];
    pxData[pxPos + 3] = data[rawPos + 3];
  },
];

let pixelBppCustomMapper = [
  // 0 - dummy entry
  function () {},

  // 1 - L
  // 0: 0, 1: 0, 2: 0, 3: 0xff
  function (pxData, pixelData, pxPos, maxBit) {
    let pixel = pixelData[0];
    pxData[pxPos] = pixel;
    pxData[pxPos + 1] = pixel;
    pxData[pxPos + 2] = pixel;
    pxData[pxPos + 3] = maxBit;
  },

  // 2 - LA
  // 0: 0, 1: 0, 2: 0, 3: 1
  function (pxData, pixelData, pxPos) {
    let pixel = pixelData[0];
    pxData[pxPos] = pixel;
    pxData[pxPos + 1] = pixel;
    pxData[pxPos + 2] = pixel;
    pxData[pxPos + 3] = pixelData[1];
  },

  // 3 - RGB
  // 0: 0, 1: 1, 2: 2, 3: 0xff
  function (pxData, pixelData, pxPos, maxBit) {
    pxData[pxPos] = pixelData[0];
    pxData[pxPos + 1] = pixelData[1];
    pxData[pxPos + 2] = pixelData[2];
    pxData[pxPos + 3] = maxBit;
  },

  // 4 - RGBA
  // 0: 0, 1: 1, 2: 2, 3: 3
  function (pxData, pixelData, pxPos) {
    pxData[pxPos] = pixelData[0];
    pxData[pxPos + 1] = pixelData[1];
    pxData[pxPos + 2] = pixelData[2];
    pxData[pxPos + 3] = pixelData[3];
  },
];

function bitRetriever(data, depth) {
  let leftOver = [];
  let i = 0;

  function split() {
    if (i === data.length) {
      throw new Error("Ran out of data");
    }
    let byte = data[i];
    i++;
    let byte8, byte7, byte6, byte5, byte4, byte3, byte2, byte1;
    switch (depth) {
      default:
        throw new Error("unrecognised depth");
      case 16:
        byte2 = data[i];
        i++;
        leftOver.push((byte << 8) + byte2);
        break;
      case 4:
        byte2 = byte & 0x0f;
        byte1 = byte >> 4;
        leftOver.push(byte1, byte2);
        break;
      case 2:
        byte4 = byte & 3;
        byte3 = (byte >> 2) & 3;
        byte2 = (byte >> 4) & 3;
        byte1 = (byte >> 6) & 3;
        leftOver.push(byte1, byte2, byte3, byte4);
        break;
      case 1:
        byte8 = byte & 1;
        byte7 = (byte >> 1) & 1;
        byte6 = (byte >> 2) & 1;
        byte5 = (byte >> 3) & 1;
        byte4 = (byte >> 4) & 1;
        byte3 = (byte >> 5) & 1;
        byte2 = (byte >> 6) & 1;
        byte1 = (byte >> 7) & 1;
        leftOver.push(byte1, byte2, byte3, byte4, byte5, byte6, byte7, byte8);
        break;
    }
  }

  return {
    get: function (count) {
      while (leftOver.length < count) {
        split();
      }
      let returner = leftOver.slice(0, count);
      leftOver = leftOver.slice(count);
      return returner;
    },
    resetAfterLine: function () {
      leftOver.length = 0;
    },
    end: function () {
      if (i !== data.length) {
        throw new Error("extra data found");
      }
    },
  };
}

function mapImage8Bit(image, pxData, getPxPos, bpp, data, rawPos) {
  // eslint-disable-line max-params
  let imageWidth = image.width;
  let imageHeight = image.height;
  let imagePass = image.index;
  for (let y = 0; y < imageHeight; y++) {
    for (let x = 0; x < imageWidth; x++) {
      let pxPos = getPxPos(x, y, imagePass);
      pixelBppMapper[bpp](pxData, data, pxPos, rawPos);
      rawPos += bpp; //eslint-disable-line no-param-reassign
    }
  }
  return rawPos;
}

function mapImageCustomBit(image, pxData, getPxPos, bpp, bits, maxBit) {
  // eslint-disable-line max-params
  let imageWidth = image.width;
  let imageHeight = image.height;
  let imagePass = image.index;
  for (let y = 0; y < imageHeight; y++) {
    for (let x = 0; x < imageWidth; x++) {
      let pixelData = bits.get(bpp);
      let pxPos = getPxPos(x, y, imagePass);
      pixelBppCustomMapper[bpp](pxData, pixelData, pxPos, maxBit);
    }
    bits.resetAfterLine();
  }
}

var dataToBitMap = function (data, bitmapInfo) {
  let width = bitmapInfo.width;
  let height = bitmapInfo.height;
  let depth = bitmapInfo.depth;
  let bpp = bitmapInfo.bpp;
  let interlace$1 = bitmapInfo.interlace;
  let bits;

  if (depth !== 8) {
    bits = bitRetriever(data, depth);
  }
  let pxData;
  if (depth <= 8) {
    pxData = Buffer.alloc(width * height * 4);
  } else {
    pxData = new Uint16Array(width * height * 4);
  }
  let maxBit = Math.pow(2, depth) - 1;
  let rawPos = 0;
  let images;
  let getPxPos;

  if (interlace$1) {
    images = interlace.getImagePasses(width, height);
    getPxPos = interlace.getInterlaceIterator(width, height);
  } else {
    let nonInterlacedPxPos = 0;
    getPxPos = function () {
      let returner = nonInterlacedPxPos;
      nonInterlacedPxPos += 4;
      return returner;
    };
    images = [{ width: width, height: height }];
  }

  for (let imageIndex = 0; imageIndex < images.length; imageIndex++) {
    if (depth === 8) {
      rawPos = mapImage8Bit(
        images[imageIndex],
        pxData,
        getPxPos,
        bpp,
        data,
        rawPos
      );
    } else {
      mapImageCustomBit(
        images[imageIndex],
        pxData,
        getPxPos,
        bpp,
        bits,
        maxBit
      );
    }
  }
  if (depth === 8) {
    if (rawPos !== data.length) {
      throw new Error("extra data found");
    }
  } else {
    bits.end();
  }

  return pxData;
};

var bitmapper = {
	dataToBitMap: dataToBitMap
};

function dePalette(indata, outdata, width, height, palette) {
  let pxPos = 0;
  // use values from palette
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let color = palette[indata[pxPos]];

      if (!color) {
        throw new Error("index " + indata[pxPos] + " not in palette");
      }

      for (let i = 0; i < 4; i++) {
        outdata[pxPos + i] = color[i];
      }
      pxPos += 4;
    }
  }
}

function replaceTransparentColor(indata, outdata, width, height, transColor) {
  let pxPos = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let makeTrans = false;

      if (transColor.length === 1) {
        if (transColor[0] === indata[pxPos]) {
          makeTrans = true;
        }
      } else if (
        transColor[0] === indata[pxPos] &&
        transColor[1] === indata[pxPos + 1] &&
        transColor[2] === indata[pxPos + 2]
      ) {
        makeTrans = true;
      }
      if (makeTrans) {
        for (let i = 0; i < 4; i++) {
          outdata[pxPos + i] = 0;
        }
      }
      pxPos += 4;
    }
  }
}

function scaleDepth(indata, outdata, width, height, depth) {
  let maxOutSample = 255;
  let maxInSample = Math.pow(2, depth) - 1;
  let pxPos = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      for (let i = 0; i < 4; i++) {
        outdata[pxPos + i] = Math.floor(
          (indata[pxPos + i] * maxOutSample) / maxInSample + 0.5
        );
      }
      pxPos += 4;
    }
  }
}

var formatNormaliser = function (indata, imageData, skipRescale = false) {
  let depth = imageData.depth;
  let width = imageData.width;
  let height = imageData.height;
  let colorType = imageData.colorType;
  let transColor = imageData.transColor;
  let palette = imageData.palette;

  let outdata = indata; // only different for 16 bits

  if (colorType === 3) {
    // paletted
    dePalette(indata, outdata, width, height, palette);
  } else {
    if (transColor) {
      replaceTransparentColor(indata, outdata, width, height, transColor);
    }
    // if it needs scaling
    if (depth !== 8 && !skipRescale) {
      // if we need to change the buffer size
      if (depth === 16) {
        outdata = Buffer.alloc(width * height * 4);
      }
      scaleDepth(indata, outdata, width, height, depth);
    }
  }
  return outdata;
};

var parserAsync = createCommonjsModule(function (module) {









let ParserAsync = (module.exports = function (options) {
  chunkstream.call(this);

  this._parser = new parser(options, {
    read: this.read.bind(this),
    error: this._handleError.bind(this),
    metadata: this._handleMetaData.bind(this),
    gamma: this.emit.bind(this, "gamma"),
    palette: this._handlePalette.bind(this),
    transColor: this._handleTransColor.bind(this),
    finished: this._finished.bind(this),
    inflateData: this._inflateData.bind(this),
    simpleTransparency: this._simpleTransparency.bind(this),
    headersFinished: this._headersFinished.bind(this),
  });
  this._options = options;
  this.writable = true;

  this._parser.start();
});
util.inherits(ParserAsync, chunkstream);

ParserAsync.prototype._handleError = function (err) {
  this.emit("error", err);

  this.writable = false;

  this.destroy();

  if (this._inflate && this._inflate.destroy) {
    this._inflate.destroy();
  }

  if (this._filter) {
    this._filter.destroy();
    // For backward compatibility with Node 7 and below.
    // Suppress errors due to _inflate calling write() even after
    // it's destroy()'ed.
    this._filter.on("error", function () {});
  }

  this.errord = true;
};

ParserAsync.prototype._inflateData = function (data) {
  if (!this._inflate) {
    if (this._bitmapInfo.interlace) {
      this._inflate = zlib.createInflate();

      this._inflate.on("error", this.emit.bind(this, "error"));
      this._filter.on("complete", this._complete.bind(this));

      this._inflate.pipe(this._filter);
    } else {
      let rowSize =
        ((this._bitmapInfo.width *
          this._bitmapInfo.bpp *
          this._bitmapInfo.depth +
          7) >>
          3) +
        1;
      let imageSize = rowSize * this._bitmapInfo.height;
      let chunkSize = Math.max(imageSize, zlib.Z_MIN_CHUNK);

      this._inflate = zlib.createInflate({ chunkSize: chunkSize });
      let leftToInflate = imageSize;

      let emitError = this.emit.bind(this, "error");
      this._inflate.on("error", function (err) {
        if (!leftToInflate) {
          return;
        }

        emitError(err);
      });
      this._filter.on("complete", this._complete.bind(this));

      let filterWrite = this._filter.write.bind(this._filter);
      this._inflate.on("data", function (chunk) {
        if (!leftToInflate) {
          return;
        }

        if (chunk.length > leftToInflate) {
          chunk = chunk.slice(0, leftToInflate);
        }

        leftToInflate -= chunk.length;

        filterWrite(chunk);
      });

      this._inflate.on("end", this._filter.end.bind(this._filter));
    }
  }
  this._inflate.write(data);
};

ParserAsync.prototype._handleMetaData = function (metaData) {
  this._metaData = metaData;
  this._bitmapInfo = Object.create(metaData);

  this._filter = new filterParseAsync(this._bitmapInfo);
};

ParserAsync.prototype._handleTransColor = function (transColor) {
  this._bitmapInfo.transColor = transColor;
};

ParserAsync.prototype._handlePalette = function (palette) {
  this._bitmapInfo.palette = palette;
};

ParserAsync.prototype._simpleTransparency = function () {
  this._metaData.alpha = true;
};

ParserAsync.prototype._headersFinished = function () {
  // Up until this point, we don't know if we have a tRNS chunk (alpha)
  // so we can't emit metadata any earlier
  this.emit("metadata", this._metaData);
};

ParserAsync.prototype._finished = function () {
  if (this.errord) {
    return;
  }

  if (!this._inflate) {
    this.emit("error", "No Inflate block");
  } else {
    // no more data to inflate
    this._inflate.end();
  }
};

ParserAsync.prototype._complete = function (filteredData) {
  if (this.errord) {
    return;
  }

  let normalisedBitmapData;

  try {
    let bitmapData = bitmapper.dataToBitMap(filteredData, this._bitmapInfo);

    normalisedBitmapData = formatNormaliser(
      bitmapData,
      this._bitmapInfo,
      this._options.skipRescale
    );
    bitmapData = null;
  } catch (ex) {
    this._handleError(ex);
    return;
  }

  this.emit("parsed", normalisedBitmapData);
};
});

var bitpacker = function (dataIn, width, height, options) {
  let outHasAlpha =
    [constants.COLORTYPE_COLOR_ALPHA, constants.COLORTYPE_ALPHA].indexOf(
      options.colorType
    ) !== -1;
  if (options.colorType === options.inputColorType) {
    let bigEndian = (function () {
      let buffer = new ArrayBuffer(2);
      new DataView(buffer).setInt16(0, 256, true /* littleEndian */);
      // Int16Array uses the platform's endianness.
      return new Int16Array(buffer)[0] !== 256;
    })();
    // If no need to convert to grayscale and alpha is present/absent in both, take a fast route
    if (options.bitDepth === 8 || (options.bitDepth === 16 && bigEndian)) {
      return dataIn;
    }
  }

  // map to a UInt16 array if data is 16bit, fix endianness below
  let data = options.bitDepth !== 16 ? dataIn : new Uint16Array(dataIn.buffer);

  let maxValue = 255;
  let inBpp = constants.COLORTYPE_TO_BPP_MAP[options.inputColorType];
  if (inBpp === 4 && !options.inputHasAlpha) {
    inBpp = 3;
  }
  let outBpp = constants.COLORTYPE_TO_BPP_MAP[options.colorType];
  if (options.bitDepth === 16) {
    maxValue = 65535;
    outBpp *= 2;
  }
  let outData = Buffer.alloc(width * height * outBpp);

  let inIndex = 0;
  let outIndex = 0;

  let bgColor = options.bgColor || {};
  if (bgColor.red === undefined) {
    bgColor.red = maxValue;
  }
  if (bgColor.green === undefined) {
    bgColor.green = maxValue;
  }
  if (bgColor.blue === undefined) {
    bgColor.blue = maxValue;
  }

  function getRGBA() {
    let red;
    let green;
    let blue;
    let alpha = maxValue;
    switch (options.inputColorType) {
      case constants.COLORTYPE_COLOR_ALPHA:
        alpha = data[inIndex + 3];
        red = data[inIndex];
        green = data[inIndex + 1];
        blue = data[inIndex + 2];
        break;
      case constants.COLORTYPE_COLOR:
        red = data[inIndex];
        green = data[inIndex + 1];
        blue = data[inIndex + 2];
        break;
      case constants.COLORTYPE_ALPHA:
        alpha = data[inIndex + 1];
        red = data[inIndex];
        green = red;
        blue = red;
        break;
      case constants.COLORTYPE_GRAYSCALE:
        red = data[inIndex];
        green = red;
        blue = red;
        break;
      default:
        throw new Error(
          "input color type:" +
            options.inputColorType +
            " is not supported at present"
        );
    }

    if (options.inputHasAlpha) {
      if (!outHasAlpha) {
        alpha /= maxValue;
        red = Math.min(
          Math.max(Math.round((1 - alpha) * bgColor.red + alpha * red), 0),
          maxValue
        );
        green = Math.min(
          Math.max(Math.round((1 - alpha) * bgColor.green + alpha * green), 0),
          maxValue
        );
        blue = Math.min(
          Math.max(Math.round((1 - alpha) * bgColor.blue + alpha * blue), 0),
          maxValue
        );
      }
    }
    return { red: red, green: green, blue: blue, alpha: alpha };
  }

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let rgba = getRGBA();

      switch (options.colorType) {
        case constants.COLORTYPE_COLOR_ALPHA:
        case constants.COLORTYPE_COLOR:
          if (options.bitDepth === 8) {
            outData[outIndex] = rgba.red;
            outData[outIndex + 1] = rgba.green;
            outData[outIndex + 2] = rgba.blue;
            if (outHasAlpha) {
              outData[outIndex + 3] = rgba.alpha;
            }
          } else {
            outData.writeUInt16BE(rgba.red, outIndex);
            outData.writeUInt16BE(rgba.green, outIndex + 2);
            outData.writeUInt16BE(rgba.blue, outIndex + 4);
            if (outHasAlpha) {
              outData.writeUInt16BE(rgba.alpha, outIndex + 6);
            }
          }
          break;
        case constants.COLORTYPE_ALPHA:
        case constants.COLORTYPE_GRAYSCALE: {
          // Convert to grayscale and alpha
          let grayscale = (rgba.red + rgba.green + rgba.blue) / 3;
          if (options.bitDepth === 8) {
            outData[outIndex] = grayscale;
            if (outHasAlpha) {
              outData[outIndex + 1] = rgba.alpha;
            }
          } else {
            outData.writeUInt16BE(grayscale, outIndex);
            if (outHasAlpha) {
              outData.writeUInt16BE(rgba.alpha, outIndex + 2);
            }
          }
          break;
        }
        default:
          throw new Error("unrecognised color Type " + options.colorType);
      }

      inIndex += inBpp;
      outIndex += outBpp;
    }
  }

  return outData;
};

function filterNone(pxData, pxPos, byteWidth, rawData, rawPos) {
  for (let x = 0; x < byteWidth; x++) {
    rawData[rawPos + x] = pxData[pxPos + x];
  }
}

function filterSumNone(pxData, pxPos, byteWidth) {
  let sum = 0;
  let length = pxPos + byteWidth;

  for (let i = pxPos; i < length; i++) {
    sum += Math.abs(pxData[i]);
  }
  return sum;
}

function filterSub(pxData, pxPos, byteWidth, rawData, rawPos, bpp) {
  for (let x = 0; x < byteWidth; x++) {
    let left = x >= bpp ? pxData[pxPos + x - bpp] : 0;
    let val = pxData[pxPos + x] - left;

    rawData[rawPos + x] = val;
  }
}

function filterSumSub(pxData, pxPos, byteWidth, bpp) {
  let sum = 0;
  for (let x = 0; x < byteWidth; x++) {
    let left = x >= bpp ? pxData[pxPos + x - bpp] : 0;
    let val = pxData[pxPos + x] - left;

    sum += Math.abs(val);
  }

  return sum;
}

function filterUp(pxData, pxPos, byteWidth, rawData, rawPos) {
  for (let x = 0; x < byteWidth; x++) {
    let up = pxPos > 0 ? pxData[pxPos + x - byteWidth] : 0;
    let val = pxData[pxPos + x] - up;

    rawData[rawPos + x] = val;
  }
}

function filterSumUp(pxData, pxPos, byteWidth) {
  let sum = 0;
  let length = pxPos + byteWidth;
  for (let x = pxPos; x < length; x++) {
    let up = pxPos > 0 ? pxData[x - byteWidth] : 0;
    let val = pxData[x] - up;

    sum += Math.abs(val);
  }

  return sum;
}

function filterAvg(pxData, pxPos, byteWidth, rawData, rawPos, bpp) {
  for (let x = 0; x < byteWidth; x++) {
    let left = x >= bpp ? pxData[pxPos + x - bpp] : 0;
    let up = pxPos > 0 ? pxData[pxPos + x - byteWidth] : 0;
    let val = pxData[pxPos + x] - ((left + up) >> 1);

    rawData[rawPos + x] = val;
  }
}

function filterSumAvg(pxData, pxPos, byteWidth, bpp) {
  let sum = 0;
  for (let x = 0; x < byteWidth; x++) {
    let left = x >= bpp ? pxData[pxPos + x - bpp] : 0;
    let up = pxPos > 0 ? pxData[pxPos + x - byteWidth] : 0;
    let val = pxData[pxPos + x] - ((left + up) >> 1);

    sum += Math.abs(val);
  }

  return sum;
}

function filterPaeth(pxData, pxPos, byteWidth, rawData, rawPos, bpp) {
  for (let x = 0; x < byteWidth; x++) {
    let left = x >= bpp ? pxData[pxPos + x - bpp] : 0;
    let up = pxPos > 0 ? pxData[pxPos + x - byteWidth] : 0;
    let upleft =
      pxPos > 0 && x >= bpp ? pxData[pxPos + x - (byteWidth + bpp)] : 0;
    let val = pxData[pxPos + x] - paethPredictor(left, up, upleft);

    rawData[rawPos + x] = val;
  }
}

function filterSumPaeth(pxData, pxPos, byteWidth, bpp) {
  let sum = 0;
  for (let x = 0; x < byteWidth; x++) {
    let left = x >= bpp ? pxData[pxPos + x - bpp] : 0;
    let up = pxPos > 0 ? pxData[pxPos + x - byteWidth] : 0;
    let upleft =
      pxPos > 0 && x >= bpp ? pxData[pxPos + x - (byteWidth + bpp)] : 0;
    let val = pxData[pxPos + x] - paethPredictor(left, up, upleft);

    sum += Math.abs(val);
  }

  return sum;
}

let filters = {
  0: filterNone,
  1: filterSub,
  2: filterUp,
  3: filterAvg,
  4: filterPaeth,
};

let filterSums = {
  0: filterSumNone,
  1: filterSumSub,
  2: filterSumUp,
  3: filterSumAvg,
  4: filterSumPaeth,
};

var filterPack = function (pxData, width, height, options, bpp) {
  let filterTypes;
  if (!("filterType" in options) || options.filterType === -1) {
    filterTypes = [0, 1, 2, 3, 4];
  } else if (typeof options.filterType === "number") {
    filterTypes = [options.filterType];
  } else {
    throw new Error("unrecognised filter types");
  }

  if (options.bitDepth === 16) {
    bpp *= 2;
  }
  let byteWidth = width * bpp;
  let rawPos = 0;
  let pxPos = 0;
  let rawData = Buffer.alloc((byteWidth + 1) * height);

  let sel = filterTypes[0];

  for (let y = 0; y < height; y++) {
    if (filterTypes.length > 1) {
      // find best filter for this line (with lowest sum of values)
      let min = Infinity;

      for (let i = 0; i < filterTypes.length; i++) {
        let sum = filterSums[filterTypes[i]](pxData, pxPos, byteWidth, bpp);
        if (sum < min) {
          sel = filterTypes[i];
          min = sum;
        }
      }
    }

    rawData[rawPos] = sel;
    rawPos++;
    filters[sel](pxData, pxPos, byteWidth, rawData, rawPos, bpp);
    rawPos += byteWidth;
    pxPos += byteWidth;
  }
  return rawData;
};

var packer = createCommonjsModule(function (module) {







let Packer = (module.exports = function (options) {
  this._options = options;

  options.deflateChunkSize = options.deflateChunkSize || 32 * 1024;
  options.deflateLevel =
    options.deflateLevel != null ? options.deflateLevel : 9;
  options.deflateStrategy =
    options.deflateStrategy != null ? options.deflateStrategy : 3;
  options.inputHasAlpha =
    options.inputHasAlpha != null ? options.inputHasAlpha : true;
  options.deflateFactory = options.deflateFactory || zlib.createDeflate;
  options.bitDepth = options.bitDepth || 8;
  // This is outputColorType
  options.colorType =
    typeof options.colorType === "number"
      ? options.colorType
      : constants.COLORTYPE_COLOR_ALPHA;
  options.inputColorType =
    typeof options.inputColorType === "number"
      ? options.inputColorType
      : constants.COLORTYPE_COLOR_ALPHA;

  if (
    [
      constants.COLORTYPE_GRAYSCALE,
      constants.COLORTYPE_COLOR,
      constants.COLORTYPE_COLOR_ALPHA,
      constants.COLORTYPE_ALPHA,
    ].indexOf(options.colorType) === -1
  ) {
    throw new Error(
      "option color type:" + options.colorType + " is not supported at present"
    );
  }
  if (
    [
      constants.COLORTYPE_GRAYSCALE,
      constants.COLORTYPE_COLOR,
      constants.COLORTYPE_COLOR_ALPHA,
      constants.COLORTYPE_ALPHA,
    ].indexOf(options.inputColorType) === -1
  ) {
    throw new Error(
      "option input color type:" +
        options.inputColorType +
        " is not supported at present"
    );
  }
  if (options.bitDepth !== 8 && options.bitDepth !== 16) {
    throw new Error(
      "option bit depth:" + options.bitDepth + " is not supported at present"
    );
  }
});

Packer.prototype.getDeflateOptions = function () {
  return {
    chunkSize: this._options.deflateChunkSize,
    level: this._options.deflateLevel,
    strategy: this._options.deflateStrategy,
  };
};

Packer.prototype.createDeflate = function () {
  return this._options.deflateFactory(this.getDeflateOptions());
};

Packer.prototype.filterData = function (data, width, height) {
  // convert to correct format for filtering (e.g. right bpp and bit depth)
  let packedData = bitpacker(data, width, height, this._options);

  // filter pixel data
  let bpp = constants.COLORTYPE_TO_BPP_MAP[this._options.colorType];
  let filteredData = filterPack(packedData, width, height, this._options, bpp);
  return filteredData;
};

Packer.prototype._packChunk = function (type, data) {
  let len = data ? data.length : 0;
  let buf = Buffer.alloc(len + 12);

  buf.writeUInt32BE(len, 0);
  buf.writeUInt32BE(type, 4);

  if (data) {
    data.copy(buf, 8);
  }

  buf.writeInt32BE(
    crc.crc32(buf.slice(4, buf.length - 4)),
    buf.length - 4
  );
  return buf;
};

Packer.prototype.packGAMA = function (gamma) {
  let buf = Buffer.alloc(4);
  buf.writeUInt32BE(Math.floor(gamma * constants.GAMMA_DIVISION), 0);
  return this._packChunk(constants.TYPE_gAMA, buf);
};

Packer.prototype.packIHDR = function (width, height) {
  let buf = Buffer.alloc(13);
  buf.writeUInt32BE(width, 0);
  buf.writeUInt32BE(height, 4);
  buf[8] = this._options.bitDepth; // Bit depth
  buf[9] = this._options.colorType; // colorType
  buf[10] = 0; // compression
  buf[11] = 0; // filter
  buf[12] = 0; // interlace

  return this._packChunk(constants.TYPE_IHDR, buf);
};

Packer.prototype.packIDAT = function (data) {
  return this._packChunk(constants.TYPE_IDAT, data);
};

Packer.prototype.packIEND = function () {
  return this._packChunk(constants.TYPE_IEND, null);
};
});

var packerAsync = createCommonjsModule(function (module) {






let PackerAsync = (module.exports = function (opt) {
  stream.call(this);

  let options = opt || {};

  this._packer = new packer(options);
  this._deflate = this._packer.createDeflate();

  this.readable = true;
});
util.inherits(PackerAsync, stream);

PackerAsync.prototype.pack = function (data, width, height, gamma) {
  // Signature
  this.emit("data", Buffer.from(constants.PNG_SIGNATURE));
  this.emit("data", this._packer.packIHDR(width, height));

  if (gamma) {
    this.emit("data", this._packer.packGAMA(gamma));
  }

  let filteredData = this._packer.filterData(data, width, height);

  // compress it
  this._deflate.on("error", this.emit.bind(this, "error"));

  this._deflate.on(
    "data",
    function (compressedData) {
      this.emit("data", this._packer.packIDAT(compressedData));
    }.bind(this)
  );

  this._deflate.on(
    "end",
    function () {
      this.emit("data", this._packer.packIEND());
      this.emit("end");
    }.bind(this)
  );

  this._deflate.end(filteredData);
};
});

var syncInflate = createCommonjsModule(function (module, exports) {

let assert$1 = assert.ok;



let kMaxLength = buffer.kMaxLength;

function Inflate(opts) {
  if (!(this instanceof Inflate)) {
    return new Inflate(opts);
  }

  if (opts && opts.chunkSize < zlib.Z_MIN_CHUNK) {
    opts.chunkSize = zlib.Z_MIN_CHUNK;
  }

  zlib.Inflate.call(this, opts);

  // Node 8 --> 9 compatibility check
  this._offset = this._offset === undefined ? this._outOffset : this._offset;
  this._buffer = this._buffer || this._outBuffer;

  if (opts && opts.maxLength != null) {
    this._maxLength = opts.maxLength;
  }
}

function createInflate(opts) {
  return new Inflate(opts);
}

function _close(engine, callback) {
  if (callback) {
    process.nextTick(callback);
  }

  // Caller may invoke .close after a zlib error (which will null _handle).
  if (!engine._handle) {
    return;
  }

  engine._handle.close();
  engine._handle = null;
}

Inflate.prototype._processChunk = function (chunk, flushFlag, asyncCb) {
  if (typeof asyncCb === "function") {
    return zlib.Inflate._processChunk.call(this, chunk, flushFlag, asyncCb);
  }

  let self = this;

  let availInBefore = chunk && chunk.length;
  let availOutBefore = this._chunkSize - this._offset;
  let leftToInflate = this._maxLength;
  let inOff = 0;

  let buffers = [];
  let nread = 0;

  let error;
  this.on("error", function (err) {
    error = err;
  });

  function handleChunk(availInAfter, availOutAfter) {
    if (self._hadError) {
      return;
    }

    let have = availOutBefore - availOutAfter;
    assert$1(have >= 0, "have should not go down");

    if (have > 0) {
      let out = self._buffer.slice(self._offset, self._offset + have);
      self._offset += have;

      if (out.length > leftToInflate) {
        out = out.slice(0, leftToInflate);
      }

      buffers.push(out);
      nread += out.length;
      leftToInflate -= out.length;

      if (leftToInflate === 0) {
        return false;
      }
    }

    if (availOutAfter === 0 || self._offset >= self._chunkSize) {
      availOutBefore = self._chunkSize;
      self._offset = 0;
      self._buffer = Buffer.allocUnsafe(self._chunkSize);
    }

    if (availOutAfter === 0) {
      inOff += availInBefore - availInAfter;
      availInBefore = availInAfter;

      return true;
    }

    return false;
  }

  assert$1(this._handle, "zlib binding closed");
  let res;
  do {
    res = this._handle.writeSync(
      flushFlag,
      chunk, // in
      inOff, // in_off
      availInBefore, // in_len
      this._buffer, // out
      this._offset, //out_off
      availOutBefore
    ); // out_len
    // Node 8 --> 9 compatibility check
    res = res || this._writeState;
  } while (!this._hadError && handleChunk(res[0], res[1]));

  if (this._hadError) {
    throw error;
  }

  if (nread >= kMaxLength) {
    _close(this);
    throw new RangeError(
      "Cannot create final Buffer. It would be larger than 0x" +
        kMaxLength.toString(16) +
        " bytes"
    );
  }

  let buf = Buffer.concat(buffers, nread);
  _close(this);

  return buf;
};

util.inherits(Inflate, zlib.Inflate);

function zlibBufferSync(engine, buffer) {
  if (typeof buffer === "string") {
    buffer = Buffer.from(buffer);
  }
  if (!(buffer instanceof Buffer)) {
    throw new TypeError("Not a string or buffer");
  }

  let flushFlag = engine._finishFlushFlag;
  if (flushFlag == null) {
    flushFlag = zlib.Z_FINISH;
  }

  return engine._processChunk(buffer, flushFlag);
}

function inflateSync(buffer, opts) {
  return zlibBufferSync(new Inflate(opts), buffer);
}

module.exports = exports = inflateSync;
exports.Inflate = Inflate;
exports.createInflate = createInflate;
exports.inflateSync = inflateSync;
});
syncInflate.Inflate;
syncInflate.createInflate;
syncInflate.inflateSync;

var syncReader = createCommonjsModule(function (module) {

let SyncReader = (module.exports = function (buffer) {
  this._buffer = buffer;
  this._reads = [];
});

SyncReader.prototype.read = function (length, callback) {
  this._reads.push({
    length: Math.abs(length), // if length < 0 then at most this length
    allowLess: length < 0,
    func: callback,
  });
};

SyncReader.prototype.process = function () {
  // as long as there is any data and read requests
  while (this._reads.length > 0 && this._buffer.length) {
    let read = this._reads[0];

    if (
      this._buffer.length &&
      (this._buffer.length >= read.length || read.allowLess)
    ) {
      // ok there is any data so that we can satisfy this request
      this._reads.shift(); // == read

      let buf = this._buffer;

      this._buffer = buf.slice(read.length);

      read.func.call(this, buf.slice(0, read.length));
    } else {
      break;
    }
  }

  if (this._reads.length > 0) {
    throw new Error("There are some read requests waitng on finished stream");
  }

  if (this._buffer.length > 0) {
    throw new Error("unrecognised content at end of stream");
  }
};
});

var process_1 = function (inBuffer, bitmapInfo) {
  let outBuffers = [];
  let reader = new syncReader(inBuffer);
  let filter = new filterParse(bitmapInfo, {
    read: reader.read.bind(reader),
    write: function (bufferPart) {
      outBuffers.push(bufferPart);
    },
    complete: function () {},
  });

  filter.start();
  reader.process();

  return Buffer.concat(outBuffers);
};

var filterParseSync = {
	process: process_1
};

let hasSyncZlib$1 = true;


if (!zlib.deflateSync) {
  hasSyncZlib$1 = false;
}






var parserSync = function (buffer, options) {
  if (!hasSyncZlib$1) {
    throw new Error(
      "To use the sync capability of this library in old node versions, please pin pngjs to v2.3.0"
    );
  }

  let err;
  function handleError(_err_) {
    err = _err_;
  }

  let metaData;
  function handleMetaData(_metaData_) {
    metaData = _metaData_;
  }

  function handleTransColor(transColor) {
    metaData.transColor = transColor;
  }

  function handlePalette(palette) {
    metaData.palette = palette;
  }

  function handleSimpleTransparency() {
    metaData.alpha = true;
  }

  let gamma;
  function handleGamma(_gamma_) {
    gamma = _gamma_;
  }

  let inflateDataList = [];
  function handleInflateData(inflatedData) {
    inflateDataList.push(inflatedData);
  }

  let reader = new syncReader(buffer);

  let parser$1 = new parser(options, {
    read: reader.read.bind(reader),
    error: handleError,
    metadata: handleMetaData,
    gamma: handleGamma,
    palette: handlePalette,
    transColor: handleTransColor,
    inflateData: handleInflateData,
    simpleTransparency: handleSimpleTransparency,
  });

  parser$1.start();
  reader.process();

  if (err) {
    throw err;
  }

  //join together the inflate datas
  let inflateData = Buffer.concat(inflateDataList);
  inflateDataList.length = 0;

  let inflatedData;
  if (metaData.interlace) {
    inflatedData = zlib.inflateSync(inflateData);
  } else {
    let rowSize =
      ((metaData.width * metaData.bpp * metaData.depth + 7) >> 3) + 1;
    let imageSize = rowSize * metaData.height;
    inflatedData = syncInflate(inflateData, {
      chunkSize: imageSize,
      maxLength: imageSize,
    });
  }
  inflateData = null;

  if (!inflatedData || !inflatedData.length) {
    throw new Error("bad png - invalid inflate data response");
  }

  let unfilteredData = filterParseSync.process(inflatedData, metaData);
  inflateData = null;

  let bitmapData = bitmapper.dataToBitMap(unfilteredData, metaData);
  unfilteredData = null;

  let normalisedBitmapData = formatNormaliser(
    bitmapData,
    metaData,
    options.skipRescale
  );

  metaData.data = normalisedBitmapData;
  metaData.gamma = gamma || 0;

  return metaData;
};

let hasSyncZlib = true;

if (!zlib.deflateSync) {
  hasSyncZlib = false;
}



var packerSync = function (metaData, opt) {
  if (!hasSyncZlib) {
    throw new Error(
      "To use the sync capability of this library in old node versions, please pin pngjs to v2.3.0"
    );
  }

  let options = opt || {};

  let packer$1 = new packer(options);

  let chunks = [];

  // Signature
  chunks.push(Buffer.from(constants.PNG_SIGNATURE));

  // Header
  chunks.push(packer$1.packIHDR(metaData.width, metaData.height));

  if (metaData.gamma) {
    chunks.push(packer$1.packGAMA(metaData.gamma));
  }

  let filteredData = packer$1.filterData(
    metaData.data,
    metaData.width,
    metaData.height
  );

  // compress it
  let compressedData = zlib.deflateSync(
    filteredData,
    packer$1.getDeflateOptions()
  );
  filteredData = null;

  if (!compressedData || !compressedData.length) {
    throw new Error("bad png - invalid compressed data response");
  }
  chunks.push(packer$1.packIDAT(compressedData));

  // End
  chunks.push(packer$1.packIEND());

  return Buffer.concat(chunks);
};

var read = function (buffer, options) {
  return parserSync(buffer, options || {});
};

var write = function (png, options) {
  return packerSync(png, options);
};

var pngSync = {
	read: read,
	write: write
};

var png = createCommonjsModule(function (module, exports) {







let PNG = (exports.PNG = function (options) {
  stream.call(this);

  options = options || {}; // eslint-disable-line no-param-reassign

  // coerce pixel dimensions to integers (also coerces undefined -> 0):
  this.width = options.width | 0;
  this.height = options.height | 0;

  this.data =
    this.width > 0 && this.height > 0
      ? Buffer.alloc(4 * this.width * this.height)
      : null;

  if (options.fill && this.data) {
    this.data.fill(0);
  }

  this.gamma = 0;
  this.readable = this.writable = true;

  this._parser = new parserAsync(options);

  this._parser.on("error", this.emit.bind(this, "error"));
  this._parser.on("close", this._handleClose.bind(this));
  this._parser.on("metadata", this._metadata.bind(this));
  this._parser.on("gamma", this._gamma.bind(this));
  this._parser.on(
    "parsed",
    function (data) {
      this.data = data;
      this.emit("parsed", data);
    }.bind(this)
  );

  this._packer = new packerAsync(options);
  this._packer.on("data", this.emit.bind(this, "data"));
  this._packer.on("end", this.emit.bind(this, "end"));
  this._parser.on("close", this._handleClose.bind(this));
  this._packer.on("error", this.emit.bind(this, "error"));
});
util.inherits(PNG, stream);

PNG.sync = pngSync;

PNG.prototype.pack = function () {
  if (!this.data || !this.data.length) {
    this.emit("error", "No data provided");
    return this;
  }

  process.nextTick(
    function () {
      this._packer.pack(this.data, this.width, this.height, this.gamma);
    }.bind(this)
  );

  return this;
};

PNG.prototype.parse = function (data, callback) {
  if (callback) {
    let onParsed, onError;

    onParsed = function (parsedData) {
      this.removeListener("error", onError);

      this.data = parsedData;
      callback(null, this);
    }.bind(this);

    onError = function (err) {
      this.removeListener("parsed", onParsed);

      callback(err, null);
    }.bind(this);

    this.once("parsed", onParsed);
    this.once("error", onError);
  }

  this.end(data);
  return this;
};

PNG.prototype.write = function (data) {
  this._parser.write(data);
  return true;
};

PNG.prototype.end = function (data) {
  this._parser.end(data);
};

PNG.prototype._metadata = function (metadata) {
  this.width = metadata.width;
  this.height = metadata.height;

  this.emit("metadata", metadata);
};

PNG.prototype._gamma = function (gamma) {
  this.gamma = gamma;
};

PNG.prototype._handleClose = function () {
  if (!this._parser.writable && !this._packer.readable) {
    this.emit("close");
  }
};

PNG.bitblt = function (src, dst, srcX, srcY, width, height, deltaX, deltaY) {
  // eslint-disable-line max-params
  // coerce pixel dimensions to integers (also coerces undefined -> 0):
  /* eslint-disable no-param-reassign */
  srcX |= 0;
  srcY |= 0;
  width |= 0;
  height |= 0;
  deltaX |= 0;
  deltaY |= 0;
  /* eslint-enable no-param-reassign */

  if (
    srcX > src.width ||
    srcY > src.height ||
    srcX + width > src.width ||
    srcY + height > src.height
  ) {
    throw new Error("bitblt reading outside image");
  }

  if (
    deltaX > dst.width ||
    deltaY > dst.height ||
    deltaX + width > dst.width ||
    deltaY + height > dst.height
  ) {
    throw new Error("bitblt writing outside image");
  }

  for (let y = 0; y < height; y++) {
    src.data.copy(
      dst.data,
      ((deltaY + y) * dst.width + deltaX) << 2,
      ((srcY + y) * src.width + srcX) << 2,
      ((srcY + y) * src.width + srcX + width) << 2
    );
  }
};

PNG.prototype.bitblt = function (
  dst,
  srcX,
  srcY,
  width,
  height,
  deltaX,
  deltaY
) {
  // eslint-disable-line max-params

  PNG.bitblt(this, dst, srcX, srcY, width, height, deltaX, deltaY);
  return this;
};

PNG.adjustGamma = function (src) {
  if (src.gamma) {
    for (let y = 0; y < src.height; y++) {
      for (let x = 0; x < src.width; x++) {
        let idx = (src.width * y + x) << 2;

        for (let i = 0; i < 3; i++) {
          let sample = src.data[idx + i] / 255;
          sample = Math.pow(sample, 1 / 2.2 / src.gamma);
          src.data[idx + i] = Math.round(sample * 255);
        }
      }
    }
    src.gamma = 0;
  }
};

PNG.prototype.adjustGamma = function () {
  PNG.adjustGamma(this);
};
});
var png_1 = png.PNG;

var requirePPT = function requirePPT(target, propertyKey, descriptor) {
  var originalMethod = descriptor.value;
  descriptor.value = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var _len,
        args,
        _key,
        _args = arguments;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!this.ppt) {
              _context.next = 5;
              break;
            }

            for (_len = _args.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = _args[_key];
            }

            _context.next = 4;
            return originalMethod.apply(this, args);

          case 4:
            return _context.abrupt("return", _context.sent);

          case 5:
            console.warn('Require koishi-plugin-puppeteer, but not install.');

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
};

var PuppeteerTool = /*#__PURE__*/function () {
  function PuppeteerTool() {
    _classCallCheck(this, PuppeteerTool);

    this.images = [];
    this.stream = {
      url: ''
    };
    this.async$ = this.asyncSelect;
    this.$ = this.select;
  }

  _createClass(PuppeteerTool, [{
    key: "ppt",
    get: function get() {
      return this.ctx.puppeteer;
    }
  }, {
    key: "cfg",
    get: function get() {
      return this.ppt.config;
    }
  }, {
    key: "initCTX",
    value: function initCTX(ctx) {
      this.ctx = ctx;
    }
  }, {
    key: "asyncOpen",
    value: function () {
      var _asyncOpen = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(url) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.ppt.launch();

              case 2:
                _context2.next = 4;
                return this.ppt.browser.newPage();

              case 4:
                this.curPage = _context2.sent;
                this.curShooter = this.curPage;
                _context2.next = 8;
                return this.curPage["goto"](url);

              case 8:
                return _context2.abrupt("return", this);

              case 9:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function asyncOpen(_x) {
        return _asyncOpen.apply(this, arguments);
      }

      return asyncOpen;
    }()
  }, {
    key: "open",
    value: function open(url) {
      this.stream.url = url;
      return this;
    }
  }, {
    key: "asyncSelect",
    value: function () {
      var _asyncSelect = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(selector) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.curPage.$(selector);

              case 2:
                this.curShooter = _context3.sent;
                return _context3.abrupt("return", this);

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function asyncSelect(_x2) {
        return _asyncSelect.apply(this, arguments);
      }

      return asyncSelect;
    }()
  }, {
    key: "select",
    value: function select(selector) {
      this.stream.selector = selector;
      return this;
    }
  }, {
    key: "asyncViewport",
    value: function () {
      var _asyncViewport = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(viewport) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.curPage.setViewport(_objectSpread2(_objectSpread2(_objectSpread2({}, this.cfg.browser.defaultViewport), this.cfg.renderViewport), viewport));

              case 2:
                return _context4.abrupt("return", this);

              case 3:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function asyncViewport(_x3) {
        return _asyncViewport.apply(this, arguments);
      }

      return asyncViewport;
    }()
  }, {
    key: "viewport",
    value: function viewport(_viewport) {
      this.stream.viewport = _viewport;
      return this;
    }
  }, {
    key: "asyncShot",
    value: function () {
      var _asyncShot = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        var _this = this;

        var option,
            buffer,
            _args5 = arguments;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                option = _args5.length > 0 && _args5[0] !== undefined ? _args5[0] : {};
                _context5.next = 3;
                return this.curShooter.screenshot(_objectSpread2({
                  encoding: 'binary'
                }, option));

              case 3:
                buffer = _context5.sent;

                if (!(buffer.byteLength > this.cfg.maxLength)) {
                  _context5.next = 7;
                  break;
                }

                _context5.next = 7;
                return new Promise(function (resolve, reject) {
                  var png = new png_1();
                  png.parse(buffer, function (error, data) {
                    return error ? reject(error) : resolve(data);
                  });
                }).then(function (data) {
                  var width = data.width;
                  var height = data.height * _this.cfg.maxLength / buffer.byteLength;
                  var png = new png_1({
                    width: width,
                    height: height
                  });
                  data.bitblt(png, 0, 0, width, height, 0, 0);
                  buffer = png_1.sync.write(png);
                })["catch"](console.error);

              case 7:
                this.images.push(segment.image(buffer));
                return _context5.abrupt("return", this);

              case 9:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function asyncShot() {
        return _asyncShot.apply(this, arguments);
      }

      return asyncShot;
    }()
  }, {
    key: "shot",
    value: function shot() {
      var option = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this.stream.option = option;
      return this;
    }
  }, {
    key: "asyncClose",
    value: function () {
      var _asyncClose = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return this.ppt.close();

              case 2:
                return _context6.abrupt("return", this);

              case 3:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function asyncClose() {
        return _asyncClose.apply(this, arguments);
      }

      return asyncClose;
    }()
  }, {
    key: "start",
    value: function () {
      var _start = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        var _this$stream, url, selector, viewport, option;

        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _this$stream = this.stream, url = _this$stream.url, selector = _this$stream.selector, viewport = _this$stream.viewport, option = _this$stream.option;
                _context7.t0 = url;

                if (!_context7.t0) {
                  _context7.next = 5;
                  break;
                }

                _context7.next = 5;
                return this.asyncOpen(url);

              case 5:
                _context7.t1 = selector;

                if (!_context7.t1) {
                  _context7.next = 9;
                  break;
                }

                _context7.next = 9;
                return this.async$(selector);

              case 9:
                _context7.t2 = viewport;

                if (!_context7.t2) {
                  _context7.next = 13;
                  break;
                }

                _context7.next = 13;
                return this.asyncViewport(viewport);

              case 13:
                _context7.t3 = option;

                if (!_context7.t3) {
                  _context7.next = 17;
                  break;
                }

                _context7.next = 17;
                return this.asyncShot(option);

              case 17:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function start() {
        return _start.apply(this, arguments);
      }

      return start;
    }()
  }]);

  return PuppeteerTool;
}();

__decorate([requirePPT], PuppeteerTool.prototype, "asyncOpen", null);

__decorate([requirePPT], PuppeteerTool.prototype, "asyncSelect", null);

__decorate([requirePPT], PuppeteerTool.prototype, "asyncViewport", null);

__decorate([requirePPT], PuppeteerTool.prototype, "asyncShot", null);

__decorate([requirePPT], PuppeteerTool.prototype, "asyncClose", null);

var pptTool = new PuppeteerTool();

User.extend(function () {
  return {
    todos: []
  };
});

var getUser = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx, session) {
    var _session$author$userI, _session$author;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", ctx.database.getUser('onebot', (_session$author$userI = session === null || session === void 0 ? void 0 : (_session$author = session.author) === null || _session$author === void 0 ? void 0 : _session$author.userId) !== null && _session$author$userI !== void 0 ? _session$author$userI : ''));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getUser(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var getTodo = function getTodo(user, id) {
  var todo = user.todos.filter(function (todo) {
    return new RegExp(id).test(todo.id);
  })[0];
  if (todo === undefined) throw new Error('todo不存在');
  return todo;
};

var aTodoTemplate = function aTodoTemplate(todo) {
  var _todo$desc, _todo$designator$qq, _todo$designator;

  var isSimple = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var id = isSimple ? todo.id.slice(0, 10) : todo.id;
  var tagsStr = todo.tags.length > 0 ? "[".concat(todo.tags.join(', '), "]") : '';
  return "[".concat(dayjs(todo.ctime).format('YYYY-MM-DD HH:mm:ss'), "][").concat(id, "]").concat(tagsStr, "\n") + "\u6807\u9898: ".concat(todo.name, "\n") + "\u4ECB\u7ECD: ".concat((_todo$desc = todo === null || todo === void 0 ? void 0 : todo.desc) !== null && _todo$desc !== void 0 ? _todo$desc : '未描述内容', "\n") + "\u6307\u6D3E\u4EBA: ".concat((_todo$designator$qq = (_todo$designator = todo.designator) === null || _todo$designator === void 0 ? void 0 : _todo$designator.qq) !== null && _todo$designator$qq !== void 0 ? _todo$designator$qq : '无指派人', "\n") + "================================= (".concat(todo.status, ")\n");
};

var staticTodosTemplate = function staticTodosTemplate(todos) {
  return "\u5171".concat(todos.length, "\uD83D\uDCDD\uFF0C") + "\u274E\u5F85\u5B8C\u6210".concat(todos.filter(function (todo) {
    return todo.status === 'processing';
  }).length, "\uFF0C") + "\u2705\u5DF2\u5B8C\u6210".concat(todos.filter(function (todo) {
    return todo.status === 'finished';
  }).length, "\n");
};
var listTodos = function listTodos(todos, tag, options) {
  todos = todos.filter(function (todo) {
    return tag === undefined || tag === 'all' || todo.tags.length > 0 && todo.tags.indexOf(tag) !== -1;
  });

  if (options !== null && options !== void 0 && options.week && !options.mouth) {
    todos = todos.filter(function (todo) {
      return !dayjs(todo.ctime).isBefore(dayjs().add(-7, 'day'));
    });
  }

  if (options !== null && options !== void 0 && options.mouth) {
    todos = todos.filter(function (todo) {
      return !dayjs(todo.ctime).isBefore(dayjs().add(-30, 'day'));
    });
  }

  return todos;
};
var registerSubCommands = function registerSubCommands(ctx, cmd) {
  registerTodosRoutes(ctx);
  var todoCommand = cmd.subcommand('.todos', {
    authority: 1
  }).alias('todos');
  todoCommand.subcommand('.add <name> [desc:text]').usage('添加todo到代办列表').option('tag', '-t [tag] 标签').option('isGroup', '-g 指定到当前群组', {
    type: 'boolean'
  }).option('user', '-u [user:user] 指定用户', {
    authority: 3
  }).action( /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref2, name, desc) {
      var session, options, sessionU, u, todo;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              session = _ref2.session, options = _ref2.options;

              if (!(name === undefined || name === '')) {
                _context2.next = 3;
                break;
              }

              return _context2.abrupt("return", '参数错误');

            case 3:
              if (!session) {
                _context2.next = 20;
                break;
              }

              _context2.next = 6;
              return getUser(ctx, session);

            case 6:
              sessionU = _context2.sent;

              if (!(options !== null && options !== void 0 && options.user)) {
                _context2.next = 13;
                break;
              }

              _context2.next = 10;
              return userTool.getUserFromStr(ctx, options.user);

            case 10:
              u = _context2.sent;
              _context2.next = 14;
              break;

            case 13:
              u = sessionU;

            case 14:
              todo = {
                id: v4(),
                name: name,
                desc: desc,
                tags: options !== null && options !== void 0 && options.tag ? [options === null || options === void 0 ? void 0 : options.tag] : [],
                status: 'processing',
                designator: {
                  qq: sessionU.onebot
                },
                ctime: new Date()
              };
              if (!u.todos) u.todos = [];
              u.todos.push(todo);
              _context2.next = 19;
              return ctx.database.setUser('onebot', u.onebot, u);

            case 19:
              return _context2.abrupt("return", "[".concat(name, "\uD83D\uDCDDtodo] \u6DFB\u52A0\u6210\u529F\n") + staticTodosTemplate(u.todos) + "\uD83D\uDCDD.id: ".concat(todo.id));

            case 20:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function (_x3, _x4, _x5) {
      return _ref3.apply(this, arguments);
    };
  }());
  todoCommand.subcommand('.list [tag]').usage('展示已有的todo，第一个参数为设置的标签').option('week', '-w 展示近一周', {
    type: 'boolean'
  }).option('mouth', '-m 展示近一个月', {
    type: 'boolean'
  }).option('picture', '-p 以图片的形式展示', {
    type: 'boolean'
  }).option('isGroup', '-g 指定到当前群组', {
    type: 'boolean'
  }).option('long', '-l 长信息', {
    type: 'boolean'
  }).option('user', '-u [user:user] 指定用户', {
    authority: 3
  }).action( /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_ref4, tag) {
      var session, options, sessionU, u, url, img, todos;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              session = _ref4.session, options = _ref4.options;

              if (!session) {
                _context3.next = 21;
                break;
              }

              _context3.next = 4;
              return getUser(ctx, session);

            case 4:
              sessionU = _context3.sent;

              if (!(options !== null && options !== void 0 && options.user)) {
                _context3.next = 11;
                break;
              }

              _context3.next = 8;
              return userTool.getUserFromStr(ctx, options.user);

            case 8:
              u = _context3.sent;
              _context3.next = 12;
              break;

            case 11:
              u = sessionU;

            case 12:
              if (!options.picture) {
                _context3.next = 19;
                break;
              }

              url = "http://localhost:13333/work/".concat(u.onebot, "/todos/").concat(tag !== null && tag !== void 0 ? tag : 'all', "?").concat(querystring.stringify(options));
              _context3.next = 16;
              return pptTool.open(url).$('body').shot().start();

            case 16:
              img = pptTool.images[0];
              pptTool.images = [];
              return _context3.abrupt("return", img);

            case 19:
              todos = listTodos(u.todos, tag, options);
              return _context3.abrupt("return", staticTodosTemplate(todos) + todos.map(function (todo) {
                return aTodoTemplate(todo, !(options !== null && options !== void 0 && options["long"]));
              }).join('\n'));

            case 21:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function (_x6, _x7) {
      return _ref5.apply(this, arguments);
    };
  }());
  todoCommand.subcommand('.update <id> [status]').usage('更新已有的todo信息，第一个参数为todo的id，可简写但必须唯一。').option('tag', '-t [tag] 标签').option('desc', '-d [desc:text] 介绍').action( /*#__PURE__*/function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(_ref6, id, status) {
      var session, options, _session$author$userI2, _session$author2, _todo$designator2, _todo$designator3, u, todo, _todo$designator$qq2, _todo$designator4;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              session = _ref6.session, options = _ref6.options;

              if (!(id === undefined || id === '' || status && ['processing', 'finished'].indexOf(status) === -1)) {
                _context4.next = 3;
                break;
              }

              return _context4.abrupt("return", '参数错误');

            case 3:
              if (!session) {
                _context4.next = 22;
                break;
              }

              _context4.prev = 4;
              _context4.next = 7;
              return getUser(ctx, session);

            case 7:
              u = _context4.sent;
              todo = getTodo(u, id);
              if (status) todo.status = status;
              (options === null || options === void 0 ? void 0 : options.tag) && todo.tags.push(options === null || options === void 0 ? void 0 : options.tag);
              if (options.desc) todo.desc = options === null || options === void 0 ? void 0 : options.desc;
              _context4.next = 14;
              return ctx.database.setUser('onebot', (_session$author$userI2 = session === null || session === void 0 ? void 0 : (_session$author2 = session.author) === null || _session$author2 === void 0 ? void 0 : _session$author2.userId) !== null && _session$author$userI2 !== void 0 ? _session$author$userI2 : '', u);

            case 14:
              if (!((_todo$designator2 = todo.designator) !== null && _todo$designator2 !== void 0 && _todo$designator2.qq && ((_todo$designator3 = todo.designator) === null || _todo$designator3 === void 0 ? void 0 : _todo$designator3.qq) !== u.onebot && status === 'finished')) {
                _context4.next = 16;
                break;
              }

              return _context4.abrupt("return", "".concat(msgTool.at((_todo$designator$qq2 = (_todo$designator4 = todo.designator) === null || _todo$designator4 === void 0 ? void 0 : _todo$designator4.qq) !== null && _todo$designator$qq2 !== void 0 ? _todo$designator$qq2 : ''), "\n").concat(aTodoTemplate(todo)));

            case 16:
              return _context4.abrupt("return", aTodoTemplate(todo));

            case 19:
              _context4.prev = 19;
              _context4.t0 = _context4["catch"](4);
              return _context4.abrupt("return", _context4.t0.message);

            case 22:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[4, 19]]);
    }));

    return function (_x8, _x9, _x10) {
      return _ref7.apply(this, arguments);
    };
  }());
  todoCommand.subcommand('.get <id>').usage('获取指定的todo信息，第一个参数为todo的id，可简写但必须唯一。').check(function (argv, id) {
    if (id === undefined || id === '') return '参数错误';
  }).action( /*#__PURE__*/function () {
    var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(_ref8, id) {
      var session, u, todo;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              session = _ref8.session;

              if (!session) {
                _context5.next = 13;
                break;
              }

              _context5.prev = 2;
              _context5.next = 5;
              return getUser(ctx, session);

            case 5:
              u = _context5.sent;
              todo = getTodo(u, id);
              return _context5.abrupt("return", aTodoTemplate(todo));

            case 10:
              _context5.prev = 10;
              _context5.t0 = _context5["catch"](2);
              return _context5.abrupt("return", _context5.t0.message);

            case 13:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[2, 10]]);
    }));

    return function (_x11, _x12) {
      return _ref9.apply(this, arguments);
    };
  }());
  todoCommand.subcommand('.del <id>').usage('删除指定的todo信息，第一个参数为todo的id，可简写但必须唯一。').action( /*#__PURE__*/function () {
    var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(_ref10, id) {
      var session, _session$author$userI3, _session$author3, u, index;

      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              session = _ref10.session;

              if (!(id === undefined || id === '')) {
                _context6.next = 3;
                break;
              }

              return _context6.abrupt("return", '参数错误');

            case 3:
              if (!session) {
                _context6.next = 20;
                break;
              }

              _context6.prev = 4;
              _context6.next = 7;
              return getUser(ctx, session);

            case 7:
              u = _context6.sent;
              index = u.todos.findIndex(function (todo) {
                return new RegExp("^".concat(id)).test(todo.id);
              });

              if (!(index === -1)) {
                _context6.next = 11;
                break;
              }

              return _context6.abrupt("return", '未检索到指定todo，请检查是否存在');

            case 11:
              u.todos.splice(index, 1);
              _context6.next = 14;
              return ctx.database.setUser('onebot', (_session$author$userI3 = session === null || session === void 0 ? void 0 : (_session$author3 = session.author) === null || _session$author3 === void 0 ? void 0 : _session$author3.userId) !== null && _session$author$userI3 !== void 0 ? _session$author$userI3 : '', u);

            case 14:
              return _context6.abrupt("return", '删除todo成功\n' + staticTodosTemplate(u.todos));

            case 17:
              _context6.prev = 17;
              _context6.t0 = _context6["catch"](4);
              return _context6.abrupt("return", _context6.t0.message);

            case 20:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, null, [[4, 17]]);
    }));

    return function (_x13, _x14) {
      return _ref11.apply(this, arguments);
    };
  }());
  todoCommand.subcommand('.clear <tag>').usage('删除指定tag的todo信息，第一个参数为todo的tag。').action( /*#__PURE__*/function () {
    var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(_ref12, tag) {
      var session, _session$author$userI4, _session$author4, u, index;

      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              session = _ref12.session;

              if (!(tag === undefined || tag === '')) {
                _context7.next = 3;
                break;
              }

              return _context7.abrupt("return", '参数错误');

            case 3:
              if (!session) {
                _context7.next = 18;
                break;
              }

              _context7.prev = 4;
              _context7.next = 7;
              return getUser(ctx, session);

            case 7:
              u = _context7.sent;
              index = 0;

              do {
                index = u.todos.findIndex(function (todo) {
                  return todo.tags.indexOf(tag) !== -1;
                }) - 1;
                u.todos.splice(index, 1);
              } while (index !== -1);

              _context7.next = 12;
              return ctx.database.setUser('onebot', (_session$author$userI4 = session === null || session === void 0 ? void 0 : (_session$author4 = session.author) === null || _session$author4 === void 0 ? void 0 : _session$author4.userId) !== null && _session$author$userI4 !== void 0 ? _session$author$userI4 : '', u);

            case 12:
              return _context7.abrupt("return", "\u5220\u9664todo(".concat(tag, ")\u6210\u529F"));

            case 15:
              _context7.prev = 15;
              _context7.t0 = _context7["catch"](4);
              return _context7.abrupt("return", _context7.t0.message);

            case 18:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, null, [[4, 15]]);
    }));

    return function (_x15, _x16) {
      return _ref13.apply(this, arguments);
    };
  }());
};

var name = 'work';
function apply(ctx, _options) {
  ctx.logger('koishi-plugin-work');

  ctx["with"](['koishi-plugin-puppeteer'], function () {
    pptTool.initCTX(ctx);
  });
  var workCommand = ctx.command('work', {
    authority: 1
  });
  registerSubCommands(ctx, workCommand);
}

export { apply, name };
