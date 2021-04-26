// 操作数据库的语句
const connections = require('../app/database')

class UserService {
  // 创建新用户
  async create(user) {
    const { name, password } = user
    const statement = `INSERT INTO users (name,password) VALUES (?,?);`
    const result = await connections.execute(statement, [name, password])
    return result[0]
  }

  // 查询用户
  async getUserByName(name) {
    const statement = `SELECT * FROM users WHERE name=?;`
    const result = await connections.execute(statement, [name])
    return result[0]
  }

  // 更新头像地址
  async updateAvatarUrlById(avatarUrl, userId) {
    const statement = `UPDATE users SET avatar_url = ? WHERE id = ?;`
    const [result] = await connections.execute(statement, [avatarUrl, userId])
    return result
  }
}

module.exports = new UserService()