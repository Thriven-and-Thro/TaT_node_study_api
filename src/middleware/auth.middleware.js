const jwt = require('jsonwebtoken')

const errorTypes = require('../constants/error-types')
const userService = require('../service/user.service')
const authService = require('../service/auth.service')
const md5password = require('../utils/password-handles')
const { PUBLIC_KEY } = require('../app/config')

const verifyLogin = async (ctx, next) => {
  // 获取用户名和密码
  const { name, password } = ctx.request.body

  // 判断用户名和密码不能为空
  if (!name || !password) {
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit('error', error, ctx)
  }

  // 判断用户名是否存在
  const result = await userService.getUserByName(name)
  const user = result[0]
  if (!user) {
    const error = new Error(errorTypes.USER_DOES_NOT_EXISTS)
    return ctx.app.emit('error', error, ctx)
  }

  // 判断密码是否和数据库一致（加密后）
  // if (md5password(password) !== user.password) {
  if (password != user.password) {
    const error = new Error(errorTypes.PASSWORD_IS_INCORRENT)
    return ctx.app.emit('error', error, ctx)
  }
  ctx.user = user
  await next()
}

// 颜值token
const verifyAuth = async (ctx, next) => {
  console.log("验证授权的middleware");
  // 获取token
  const authorization = ctx.headers.authorization
  if (!authorization) {
    const error = new Error(errorTypes.UNAUTHORIZATION)
    return ctx.app.emit('error', error, ctx)
  }
  const token = authorization.replace('Bearer ', '')
  // 验证token
  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ['RS256']
    })
    ctx.user = result
    await next()
  } catch (errr) {
    const error = new Error(errorTypes.UNAUTHORIZATION)
    return ctx.app.emit('error', error, ctx)
  }
}

const verifyPermission = async (ctx, next) => {
  console.log('验证权限的middleware');
  const userId = ctx.user.id

  // 获取动态的tableName
  const [resourceKey] = Object.keys(ctx.params)
  const tableName = resourceKey.replace('Id', '')
  const resourceId = ctx.params[resourceKey]

  // 在下一层如果有异常，会一直向上寻找，直达找到处理异常
  // 在这里的try catch的作用就是在下一层出错及时处理异常，是报错的位置准确
  try {
    const isPermission = await authService.checkResoure(tableName, resourceId, userId)
    if (!isPermission) throw new Error()

    await next()

  } catch (err) {
    const error = new Error(errorTypes.UNPERMISSION)
    return ctx.app.emit('error', error, ctx)
  }

}

module.exports = {
  verifyLogin,
  verifyAuth,
  verifyPermission
}