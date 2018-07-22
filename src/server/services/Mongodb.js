/**
 * @description index数据拉取模块
 * @author Jerry
 */
import mongodb from 'mongodb'

/**
 * UserService
 * @type {Class}
 */
class Mongodb {
	async constructor() {
		this.db = await this.connect2db()
	}

	connect2db() {
		const MongoClient = mongodb.MongoClient;
		const url = 'mongodb://localhost:27017';
		return new Promise((resolve, reject) => {
			MongoClient.connect(url, {
				useNewUrlParser: true
			}, function(err, db) {
				if (err) reject(err)
				resolve(db)
			});
		})
	}

	async isUserExists(username) {
		const db = await this.connect2db()
		return new Promise((resolve, reject) => {
			db.db('listenforuser').collection("users").find({
				name: username
			}).toArray(function(err, res) {
				if (err) reject(err)
				if (res && res[0]) {
					resolve(true)
				} else {
					resolve(false)
				}
				db.close();
			})
		})
	}

	async insertUser(username, password) {
		const db = await this.connect2db()
		const insertOption = {
			username,
			password
		}
		return new Promise((resolve, reject) => {
			db.db('listenforuser').collection("users").insertOne(insertOption, function(err, res) {
				if (err) resolve({
					state: 1,
					msg: "注册失败"
				});
				resolve({
					state: 0,
					msg: "注册成功"
				})
				db.close();
			})
		})
	}

	async getPassword(username) {
		const db = await this.connect2db()
		return new Promise((resolve, reject) => {
			db.db('listenforuser').collection("users").find({
				name: username
			}).toArray(function(err, res) {
				if (err) reject(err)
				resolve(res[0].password)
				db.close();
			})
		})
	}

	async getWordList(username) {
		const db = await this.connect2db()
		return new Promise((resolve, reject) => {
			db.db('listenfordata').collection(username).find().toArray(function(err, res) {
				if (err) reject(err)
				resolve(res)
				db.close();
			})
		})
	}

}

export default Mongodb