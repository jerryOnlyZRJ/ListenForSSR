'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongodb = require('mongodb');

var _mongodb2 = _interopRequireDefault(_mongodb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * UserService
 * @type {Class}
 */
let Mongodb = class Mongodb {
	connect2db() {
		const MongoClient = _mongodb2.default.MongoClient;
		const url = 'mongodb://localhost:27017';
		return new Promise((resolve, reject) => {
			MongoClient.connect(url, {
				useNewUrlParser: true
			}, function (err, db) {
				if (err) reject(err);
				resolve(db);
			});
		});
	}

	async isUserExists(username) {
		const db = await this.connect2db();
		return new Promise((resolve, reject) => {
			db.db('listenforuser').collection("users").find({
				name: username
			}).toArray(function (err, res) {
				if (err) reject(err);
				if (res && res[0]) {
					resolve(true);
				} else {
					resolve(false);
				}
				db.close();
			});
		});
	}

	async isWordExists(user, title) {
		const db = await this.connect2db();
		return new Promise((resolve, reject) => {
			db.db('listenfordata').collection(user).find({
				title: title
			}).toArray(function (err, res) {
				if (err) reject(err);
				if (res && res[0]) {
					resolve(true);
				} else {
					resolve(false);
				}
				db.close();
			});
		});
	}

	async insertUser(username, password) {
		const db = await this.connect2db();
		const insertOption = {
			username,
			password
		};
		return new Promise((resolve, reject) => {
			db.db('listenforuser').collection("users").insertOne(insertOption, function (err, res) {
				if (err) resolve({
					state: 1,
					msg: "注册失败"
				});
				resolve({
					state: 0,
					msg: "注册成功"
				});
				db.close();
			});
		});
	}

	async getPassword(username) {
		const db = await this.connect2db();
		return new Promise((resolve, reject) => {
			db.db('listenforuser').collection("users").find({
				name: username
			}).toArray(function (err, res) {
				if (err) reject(err);
				resolve(res[0].password);
				db.close();
			});
		});
	}

	async getWordList(username) {
		const db = await this.connect2db();
		return new Promise((resolve, reject) => {
			db.db('listenfordata').collection(username).find().toArray(function (err, res) {
				if (err) reject(err);
				resolve(res);
				db.close();
			});
		});
	}

	async insertWord(user, wordOptions) {
		const db = await this.connect2db();
		return new Promise((resolve, reject) => {
			db.db('listenfordata').collection(user).insertOne(wordOptions, function (err, res) {
				if (err) reject(err);
				resolve(res);
				db.close();
			});
		});
	}

	async updateWord(user, wordOptions) {
		const db = await this.connect2db();
		const {
			title,
			date,
			content
		} = wordOptions;
		const whereStr = {
			"title": title
		};
		const updateStr = {
			$set: {
				date: date,
				content: content
			}
		};
		return new Promise((resolve, reject) => {
			db.db('listenfordata').collection(user).updateOne(whereStr, updateStr, function (err, res) {
				if (err) throw err;
				resolve({
					state: 0,
					msg: '文档更新成功！'
				});
				db.close();
			});
		});
	}
}; /**
    * @description index数据拉取模块
    * @author Jerry
    */

exports.default = Mongodb;