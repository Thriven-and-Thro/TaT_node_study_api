const jwt = require('jsonwebtoken')
const { PRIVATE_KEY } = require('../app/config')

class AuthController {
  async login(ctx, next) {
    const { id, name } = ctx.user
    // 颁发签名
    const token = jwt.sign({ id, name }, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24, // 过期时间
      algorithm: 'RS256' // 加密方式
    })

    ctx.body = {
      id,
      name,
      token
    }
  }

  async success(ctx, next) {
    ctx.body = '授权成功'
  }
}

module.exports = new AuthController()