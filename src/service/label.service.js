const connection = require('../app/database')

class LabelService {
  async create(name) {
    const statement = `INSERT INTO label (name) VALUES (?);`
    const [result] = await connection.execute(statement, [name])
    return result
  }

  async getLabelByName(name) {
    const statement = `SELECT * FROM label WHERE name = ?;`
    const [result] = await connection.execute(statement, [name])
    return result[0] ? result[0] : false
  }

  async list(offset, size) {
    const statement = `SELECT * FROM label LIMIT ?,?;`
    const [result] = await connection.execute(statement, [offset, size])
    return result
  }

  async getOne(momentId) {
    const statement = `
      SELECT ml.moment_id,ml.label_id,l.name
	      FROM moment_label ml
	      LEFT JOIN label l ON ml.label_id=l.id
	      WHERE ml.moment_id = ?;
    `
    const [result] = await connection.execute(statement, [momentId])
    return result
  }
}

module.exports = new LabelService()