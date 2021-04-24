const commentService = require('../service/comment.service')

class CommentController {
  async create(ctx, next) {
    const { momentId, content } = ctx.request.body
    const userId = ctx.user.id
    const result = await commentService.create(momentId, content, userId)
    ctx.body = result
  }

  async reply(ctx, next) {
    const { momentId, content } = ctx.request.body
    const commentId = ctx.params.commentId
    const userId = ctx.user.id
    const result = await commentService.reply(content, momentId, commentId, userId)
    ctx.body = result
  }

  async update(ctx, next) {
    const { commentId } = ctx.params
    const { content } = ctx.request.body
    const result = await commentService.update(commentId, content)
    ctx.body = result
  }

  async remove(ctx, next) {
    const { commentId } = ctx.params
    const result = await commentService.remove(commentId)
    ctx.body = result
  }

  async list(ctx, next) {
    const { momentId } = ctx.query
    const result = await commentService.list(momentId)
    ctx.body = result
  }
}

module.exports = new CommentController()