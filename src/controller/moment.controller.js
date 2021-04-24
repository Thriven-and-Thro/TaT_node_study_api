const fs = require('fs')

const momentService = require('../service/moment.service')
const fileService = require('../service/file.service')
const { PICTURE_PATH } = require('../constants/file-path')

class MomentController {
  async create(ctx, next) {
    const userId = ctx.user.id
    const content = ctx.request.body.content
    const result = await momentService.create(userId, content)
    ctx.body = result
  }

  async detail(ctx, next) {
    const momentId = ctx.params.moment

    const result = await momentService.getMomentById(momentId)
    ctx.body = result
  }

  async list(ctx, next) {
    const { offset, size } = ctx.query

    const result = await momentService.getMomentList(offset, size)
    ctx.body = result
  }

  async update(ctx, next) {
    const momentId = ctx.params.moment
    const content = ctx.request.body.content

    const result = await momentService.update(content, momentId)
    ctx.body = result
  }

  async remove(ctx, next) {
    const momentId = ctx.params.moment

    const result = await momentService.remove(momentId)
    ctx.body = result
  }

  async addLabels(ctx, next) {
    const { labels } = ctx
    const { momentId } = ctx.params

    // 给动态添加标签
    for (let label of labels) {
      // 判断标签是否与动态有联系
      const isExist = await momentService.hasLabel(momentId, label.id)
      if (!isExist) {
        await momentService.addLabel(momentId, label.id)
      }
    }

    ctx.body = "添加标签成功"
  }

  async fileInfo(ctx, next) {
    let { filename } = ctx.params
    const fileInfo = await fileService.getFileByFileName(filename)
    const { type } = ctx.query
    const types = ['small', 'middle', 'large']
    if (types.some(item => item === type)) {
      filename = filename + '-' + type
    }
    ctx.response.set('content-type', fileInfo.mimetype)
    ctx.body = fs.createReadStream(`${PICTURE_PATH}/${filename}`)
  }
}

module.exports = new MomentController()
