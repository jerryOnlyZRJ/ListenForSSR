"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _vueServerRenderer = require("vue-server-renderer");

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _lruCache = require("lru-cache");

var _lruCache2 = _interopRequireDefault(_lruCache);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let IndexService = class IndexService {
  constructor() {}
  async init(ctx) {
    const serverBundle = require(_path2.default.join(__dirname, '../assets/vue-ssr-server-bundle.json'));
    const clientManifest = require(_path2.default.join(__dirname, '../assets/vue-ssr-client-manifest.json'));
    const template = _fs2.default.readFileSync(_path2.default.join(__dirname, '../assets/index.html'), 'utf-8');
    const context = {
      url: ctx.url
    };
    const ssrrender = this.createRenderer(serverBundle, template, clientManifest);

    function createSSRStreamPromise() {
      return new Promise((resolve, reject) => {
        if (!ssrrender) {
          return ctx.body = 'waiting for compilation.. refresh in a moment.';
        }
        const ssrStream = ssrrender.renderToStream(context);
        ctx.status = 200;
        ctx.type = 'html';
        ssrStream.on('error', err => {
          reject(err);
        }).pipe(ctx.res);
      });
    }
    await createSSRStreamPromise(context);
  }
  createRenderer(serverbundle, template, clientManifest) {
    return (0, _vueServerRenderer.createBundleRenderer)(serverbundle, {
      cache: (0, _lruCache2.default)({
        max: 10000
      }),
      runInNewContext: false,
      template,
      clientManifest
    });
  }
};
exports.default = IndexService;