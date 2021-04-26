const fileService = require('../service/file.service')
const userService = require('../service/user.service')
const { APP_HOST, APP_PORT } = require('../app/config')

class FileController {
  async saveAvatarInfo(ctx, next) {
    // 获取图片的相关信息
    const { filename, mimetype, size } = ctx.req.file
    const userId = ctx.user.id
    const result = await fileService.createAvatar(filename, mimetype, size, userId)

    // 保存图片地址到users表中
    const avatarUrl = `${APP_HOST}:${APP_PORT}/users/${userId}/avatar`
    await userService.updateAvatarUrlById(avatarUrl, userId)
    ctx.body = '上传头像成功'
  }

  async savePictureInfo(ctx, next) {
    const files = ctx.req.files
    console.log(ctx.req);
    const userId = ctx.user.id
    const { momentId } = ctx.query

    for (let file of files) {
      const { filename, mimetype, size } = file
      await fileService.createFile(filename, mimetype, size, userId, momentId)
    }

    ctx.body = "动态配图上传成功"
  }
}

module.exports = new FileController()