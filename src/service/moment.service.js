const connection = require('../app/database')

class MomentService {
  async create(userId, content) {
    const statement = `INSERT INTO moment (content, user_id) VALUES (?,?);`
    const [result] = await connection.execute(statement, [content, userId])
    return result
  }

  async getMomentById(id) {
    const statement = `
      SELECT
	      m.id id,m.content content,m.createAt createTime, m.updateAt updateTime,
	      JSON_OBJECT('id',u.id,'name',u.name,'avatar',u.avatar_url) user,
        (SELECT COUNT(*) FROM comment c WHERE c.comment_id = m.id) commentCount,
        (SELECT COUNT(*) FROM moment_label ml WHERE ml.moment_id = m.id) labelCount,
        (SELECT JSON_ARRAYAGG(CONCAT('http://localhost:8000/moment/images/',file.filename)) FROM file WHERE m.id = file.moment_id) images
      FROM moment m
      LEFT JOIN users u ON m.user_id = u.id
      WHERE m.id = ?;
    `
    const [result] = await connection.execute(statement, [id])
    return result[0]
  }

  async getMomentList(offset, size) {
    const statement = `
      SELECT
      	m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
      	JSON_OBJECT('id', u.id, 'name', u.name,'avatar',u.avatar_url) author,
      	(SELECT COUNT(*) FROM comment c WHERE c.comment_id = m.id) commentCount,
      	(SELECT COUNT(*) FROM moment_label ml WHERE ml.moment_id = m.id) labelCount,
        (SELECT JSON_ARRAYAGG(CONCAT('http://localhost:8000/moment/images/',file.filename)) FROM file WHERE m.id = file.moment_id) images
      FROM moment m
      LEFT JOIN users u ON m.user_id = u.id
      LIMIT ?, ?;
    `
    const [result] = await connection.execute(statement, [offset, size])
    return result
  }

  async update(content, momentId) {
    const statement = `UPDATE moment SET content = ? WHERE id = ?;`
    const [result] = await connection.execute(statement, [content, momentId])
    return result
  }

  async remove(momentId) {
    const statement = `DELETE FROM moment WHERE id = ?;`
    const [result] = await connection.execute(statement, [momentId])
    return result
  }

  // 该动态是否与该标签已经联系
  async hasLabel(momentId, labelId) {
    const statement = `SELECT * FROM moment_label WHERE moment_id = ? AND label_id = ?;`
    const [result] = await connection.execute(statement, [momentId, labelId])
    return result[0] ? true : false
  }

  async addLabel(momentId, labelId) {
    const statement = `INSERT INTO moment_label (moment_id,label_id) VALUES (?,?);`
    const [result] = await connection.execute(statement, [momentId, labelId])
    return result
  }
}

module.exports = new MomentService()