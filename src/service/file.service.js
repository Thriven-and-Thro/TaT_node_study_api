const connection = require('../app/database')

class FileService {
  async createAvatar(filename, mimetype, size, userId) {
    const statrment = `INSERT INTO avatar (filename,mimetype,size,user_id) VALUES (?,?,?,?);`
    const [result] = await connection.execute(statrment, [filename, mimetype, size, userId])
    return result
  }

  async getAvatarByUserId(userId) {
    const statement = `SELECT * FROM avatar WHERE user_id = ?;`
    const [result] = await connection.execute(statement, [userId])
    return result.slice(-1)[0]
  }

  async createFile(filename, mimetype, size, userId, momentId) {
    const statrment = `INSERT INTO file (filename,mimetype,size,user_id,moment_id) VALUES (?,?,?,?,?);`
    const [result] = await connection.execute(statrment, [filename, mimetype, size, userId, momentId])
    return result
  }

  async getFileByFileName(filename) {
    const statement = `SELECT * FROM file WHERE filename = ?;`
    const [result] = await connection.execute(statement, [filename])
    return result[0]
  }
}

module.exports = new FileService()