"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Mongodb = require("./Mongodb.js");

var _Mongodb2 = _interopRequireDefault(_Mongodb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * UserService
 * @type {Class}
 */
let UserService = class UserService {
  constructor() {
    this.mongodb = new _Mongodb2.default();
  }

  async register(username, password) {
    const isUserExists = await this.mongodb.isUserExists(username);
    if (isUserExists) {
      return {
        state: 2,
        msg: "用户名已存在"
      };
    } else {
      return await this.mongodb.insertUser(username, password);
    }
  }

  async checkPassword(username, password) {
    const isUserExists = await this.mongodb.isUserExists(username);
    if (!isUserExists) {
      return {
        state: 2,
        msg: "用户不存在"
      };
    } else {
      const pw = await this.mongodb.getPassword(username);
      if (password === pw) {
        return {
          state: 0,
          msg: "登录成功！"
        };
      } else {
        return {
          state: 1,
          "msg": "密码错误！"
        };
      }
    }
  }

  async isWordExists(user, title) {
    return await this.mongodb.isWordExists(user, title);
  }

  async getWordList(user) {
    return await this.mongodb.getWordList(user);
  }

  async updateWords(updateOptions) {
    const {
      user,
      title,
      date,
      content
    } = updateOptions;
    const wordOptions = {
      title,
      date,
      content
    };
    const isWordExists = await this.mongodb.isWordExists(user, title);
    if (!isWordExists) {
      return await this.mongodb.insertWord(user, wordOptions);
    } else {
      return await this.mongodb.updateWord(user, wordOptions);
    }
  }
}; /**
    * @description index数据拉取模块
    * @author Jerry
    */

exports.default = UserService;