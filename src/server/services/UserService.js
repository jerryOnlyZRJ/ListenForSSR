/**
 * @description index数据拉取模块
 * @author Jerry
 */
import Mongodb from './Mongodb.js'

/**
 * UserService
 * @type {Class}
 */
class UserService {
  constructor() {
    this.mongodb = new Mongodb()
  }

  async register(username, password) {
    const isUserExists = await this.isUserExists(username)
    if (isUserExists) {
      return {
        state: 2,
        msg: "用户名已存在"
      }
    } else {
      return await this.mongodb.insertUser(username, password)
    }
  }

  async checkPassword(username, password) {
    const isUserExists = await this.mongodb.isUserExists(username)
    if (!isUserExists) {
      return {
        state: 2,
        msg: "用户不存在"
      }
    } else {
      const pw = await this.mongodb.getPassword(username)
      if (password === pw) {
        return {
          state: 0,
          msg: "登录成功！"
        }
      } else {
        return {
          state: 1,
          "msg": "密码错误！"
        }
      }
    }
  }

  async getWordList(username) {
    return await this.mongodb.getWordList(username)
  }

  updateWords(updateOptions) {
    return await this.mongodb.updateWords(updateOptions)
  }
}

export default UserService