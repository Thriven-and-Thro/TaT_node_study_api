// 错误处理
const errorTypes = require('../constants/error-types')

const errorHandler = (error, ctx) => {
  let status, message;

  switch (error.message) {
    case errorTypes.NAME_OR_PASSWORD_IS_REQUIRED:
      status = 400 // bad request
      message = "用户名或密码不能为空"
      break
    case errorTypes.USER_ALREADY_EXISTS:
      status = 409 // conflict
      message = "用户名已存在"
      break
    case errorTypes.USER_DOES_NOT_EXISTS:
      status = 400 // bad request
      message = "用户名不存在"
      break
    case errorTypes.PASSWORD_IS_INCORRENT:
      status = 400 // bad request
      message = "密码错误"
      break
    case errorTypes.UNAUTHORIZATION:
      status = 401 // bad request
      message = "无效的token"
      break
    case errorTypes.UNPERMISSION:
      status = 401 // bad request
      message = "没有权限"
      break
    default:
      status = 404
      message = "NOT FOUND"
  }

  ctx.status = status
  ctx.body = message
}

module.exports = errorHandler