// 文件上传中间件
const path = require('path')

const Multer = require('koa-multer')
const Jimp = require('jimp')

const { AVATAR_PATH, PICTURE_PATH } = require('../constants/file-path')

// 头像
// 上传路径
const avatarUpload = Multer({
  dest: AVATAR_PATH
})
// 上传单一
const avatarHander = avatarUpload.single('avatar')

// 图片
const pictureUpload = Multer({
  dest: PICTURE_PATH
})
const pictureHander = pictureUpload.array('picture', 9)

const pictureResize = async (ctx, next) => {
  const files = ctx.req.files

  // 改变图片大小
  for (let file of files) {
    const destPath = path.join(file.destination, file.filename)
    Jimp.read(file.path).then(image => {
      image.resize(1280, Jimp.AUTO).write(`${destPath}-large`)
      image.resize(640, Jimp.AUTO).write(`${destPath}-middle`)
      image.resize(320, Jimp.AUTO).write(`${destPath}-small`)
    })
  }

  await next()
}

module.exports = {
  avatarHander,
  pictureHander,
  pictureResize
}