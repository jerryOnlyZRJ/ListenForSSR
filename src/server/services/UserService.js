/**
 * @description index数据拉取模块
 * @author Jerry
 */
import mongodb from 'mongodb'

/**
 * UserService
 * @type {Class}
 */
class UserService {\
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
  checkPassword() {

  }
  register() {

  }
  getWordList() {

  }
  updateWords() {

  }
}

export default UserService