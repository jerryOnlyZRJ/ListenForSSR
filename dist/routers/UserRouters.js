'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _class, _desc, _value, _class2;

var _awilixKoa = require('awilix-koa');

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
        desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
        desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
        return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
        desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
        desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
        Object['define' + 'Property'](target, property, desc);
        desc = null;
    }

    return desc;
}

let TestRouter = (_dec = (0, _awilixKoa.route)('/user'), _dec2 = (0, _awilixKoa.GET)(), _dec3 = (0, _awilixKoa.route)("/register"), _dec4 = (0, _awilixKoa.POST)(), _dec5 = (0, _awilixKoa.route)("/login"), _dec6 = (0, _awilixKoa.POST)(), _dec7 = (0, _awilixKoa.route)("/getwordlist"), _dec8 = (0, _awilixKoa.POST)(), _dec9 = (0, _awilixKoa.route)("/getwordlist"), _dec10 = (0, _awilixKoa.POST)(), _dec11 = (0, _awilixKoa.route)("/updatewords"), _dec12 = (0, _awilixKoa.POST)(), _dec(_class = (_class2 = class TestRouter {
    constructor({
        userService
    }) {
        this.userService = userService;
    }

    async getTest(ctx) {
        ctx.body = 'test user routers';
    }

    // POST {username, password(md5)}

    async register(ctx) {
        const {
            username,
            password
        } = ctx.request.body;
        ctx.body = await this.userService.register(username, password);
    }

    // POST {username, password(md5)}

    async login(ctx) {
        const {
            username,
            password
        } = ctx.request.body;
        ctx.body = await this.userService.checkPassword(username, password);
    }

    // GET /user/iswordexists?user=ranjayzheng&title=test

    async isWordExists(ctx) {
        const {
            user,
            title
        } = ctx.request.query;
        ctx.body = await this.userService.isWordExists(user, title);
    }

    // GET /user/getwordlist?user=ranjayzheng

    async getWordList(ctx) {
        const username = ctx.request.query.user;
        ctx.body = await this.userService.getWordList(username);
    }

    // POST {user, title, date, content}

    async updateWords(ctx) {
        const updateOptions = ctx.request.body;
        ctx.body = await this.userService.updateWords(updateOptions);
    }
}, (_applyDecoratedDescriptor(_class2.prototype, 'getTest', [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, 'getTest'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'register', [_dec3, _dec4], Object.getOwnPropertyDescriptor(_class2.prototype, 'register'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'login', [_dec5, _dec6], Object.getOwnPropertyDescriptor(_class2.prototype, 'login'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'isWordExists', [_dec7, _dec8], Object.getOwnPropertyDescriptor(_class2.prototype, 'isWordExists'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'getWordList', [_dec9, _dec10], Object.getOwnPropertyDescriptor(_class2.prototype, 'getWordList'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'updateWords', [_dec11, _dec12], Object.getOwnPropertyDescriptor(_class2.prototype, 'updateWords'), _class2.prototype)), _class2)) || _class);
exports.default = TestRouter;