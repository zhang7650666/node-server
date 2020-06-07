const crypto = require('crypto');

// 密匙
const SECRET_KEY = 'Hadwinhahh@';

// md5加密
const md5 = (content) => {
    let md5Hash = crypto.createHash('md5');
    return md5Hash.update(content).digest('hex');
};

// 加密函数
const genPassword = (password) => {
    const str = `password=${password}&key=${SECRET_KEY}`
    return md5(str)
}

module.exports = {
    genPassword,
}

