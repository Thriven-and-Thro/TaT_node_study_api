// md5加密
// 导入模块crypto
const crypto = require('crypto');

const md5password = (password) => {
  const md5 = crypto.createHash('md5');

  const result = md5.update(password).digest('hex');
  console.log('111');
  return result;
}

module.exports = md5password;