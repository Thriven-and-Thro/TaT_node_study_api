// 抽取出user路由的注册
const Router = require('koa-router')
const { create, avatarInfo } = require('../controller/user.controller')
const { verifyUser, handlePassword } = require('../middleware/user.middleware')

const userRouter = new Router({ prefix: '/users' })

// 注册用户
userRouter.post('/', verifyUser, handlePassword, create)
// 获取用户头像
userRouter.get('/:userId/avatar', avatarInfo)

module.exports = userRouter