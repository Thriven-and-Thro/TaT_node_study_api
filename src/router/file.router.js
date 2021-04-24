const Router = require('koa-router')

const { avatarHander, pictureHander, pictureResize } = require('../middleware/file.middleware')
const { verifyAuth } = require('../middleware/auth.middleware')
const { saveAvatarInfo, savePictureInfo } = require('../controller/file.controller')

const fileRouter = new Router({ prefix: '/upload' })

fileRouter.post('/avatar', verifyAuth, avatarHander, saveAvatarInfo)
fileRouter.post('/picture', verifyAuth, pictureHander, pictureResize, savePictureInfo)

module.exports = fileRouter