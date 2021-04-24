const Router = require('koa-router')

const { create, detail, list, update, remove, addLabels, fileInfo } = require('../controller/moment.controller')
const { verifyAuth, verifyPermission } = require('../middleware/auth.middleware')
const { verifyLabelExists } = require('../middleware/label.middleware')

const momentRouter = new Router({ prefix: '/moment' })

// 创建动态
momentRouter.post('/', verifyAuth, create)
// 获取所有动态
momentRouter.get('/', list)
// 获取单条动态
momentRouter.get('/:moment', detail)
// 修改动态
momentRouter.patch('/:moment', verifyAuth, verifyPermission, update)
// 删除动态
momentRouter.delete('/:moment', verifyAuth, verifyPermission, remove)

// 添加标签
momentRouter.post('/:momentId/labels', verifyAuth, verifyPermission, verifyLabelExists, addLabels)

// 动态配图的服务
momentRouter.get('/images/:filename', fileInfo)

module.exports = momentRouter