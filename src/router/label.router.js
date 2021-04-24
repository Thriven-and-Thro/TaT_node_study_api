const Router = require('koa-router')

const { verifyAuth } = require('../middleware/auth.middleware')
const { create, list, getOne } = require('../controller/label.controller')

const labelRouter = new Router({ prefix: '/label' })

// 创建标签
labelRouter.post('/', verifyAuth, create)
// 获取标签
labelRouter.get('/list', list)
// 获取单条标签
labelRouter.get('/:momentId', getOne)

module.exports = labelRouter