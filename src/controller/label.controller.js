const labelService = require('../service/label.service')

class LabelController {
  async create(ctx, next) {
    const { name } = ctx.request.body
    const result = await labelService.create(name)
    ctx.body = result
  }

  async list(ctx, next) {
    const { offset, size } = ctx.query
    const result = await labelService.list(offset, size)
    ctx.body = result
  }

  async getOne(ctx, next) {
    const { momentId } = ctx.params
    const result = await labelService.getOne(momentId)
    ctx.body = result
  }
}

module.exports = new LabelController()