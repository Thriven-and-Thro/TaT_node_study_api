const app = require('./app')
const config = require('./app/config')
// 因为在本模块中不重复使用，只导入让其运行
require('./app/database')

app.listen(config.APP_PORT, () => {
  console.log(`服务器${config.APP_PORT}启动`);
})