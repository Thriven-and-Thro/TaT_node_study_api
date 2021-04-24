// 注册中间件
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')

const useRoutes = require('../router')
const errorHandler = require('./error-handle')

const app = new Koa()

app.use(bodyParser())
useRoutes(app)

// 监听到错误，调用错误处理
app.on('error', errorHandler)

module.exports = app