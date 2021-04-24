// 抽取出user路由的操作
const fs = require('fs')

const fileService = require('../service/file.service')
const service = require('../service/user.service')
const { AVATAR_PATH } = require('../constants/file-path')

// 创建一个类
class UserController {
  async create(ctx, next) {
    // 获取用户请求的参数
    const user = ctx.request.body

    // 查询数据
    const result = await service.create(user)

    // 返回数据
    ctx.body = result
  }

  async avatarInfo(ctx, next) {
    const { userId } = ctx.params
    const avatarInfo = await fileService.getAvatarByUserId(userId)
    // 这种读取方式会把文件下载下来，这是下载文件的操作
    // ctx.body = fs.createReadStream(`${AVATAR_PATH}/${avatarInfo.filename}`)

    // 先设置类型为图片，则会展示
    ctx.response.set('content-type', avatarInfo.mimetype)
    ctx.body = fs.createReadStream(`${AVATAR_PATH}/${avatarInfo.filename}`)
  }
}

module.exports = new UserController()