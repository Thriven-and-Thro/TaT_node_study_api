const labelService = require('../service/label.service')

const verifyLabelExists = async (ctx, next) => {
  console.log("验证标签的middleware");
  const { labels } = ctx.request.body

  // 判断标签是否在表中存在，存在则使用该标签id，不存在则创建
  const newLabels = []
  for (let name of labels) {
    // 获取存在的标签
    const labelResult = await labelService.getLabelByName(name)
    const label = { name }
    // 如果为undefined
    if (!labelResult) {
      // 创建标签
      const result = await labelService.create(name)
      // 获取新创建的id
      label.id = result.insertId
    } else {
      label.id = labelResult.id
    }
    newLabels.push(label)
  }
  ctx.labels = newLabels

  await next()
}


module.exports = {
  verifyLabelExists
}