const fs = require('fs');
const path = require('path');

function resolve(filename) {
    return path.resolve(__dirname, '../logs/', filename)
}


// 写日志
function writeLog(writeStream, log) {
    writeStream.write(log + '\n');
}
const createWriteStream = (filename) => {
    const fullFileName = resolve(filename);
    const writeStream = fs.createWriteStream(fullFileName, {
        flags: 'a', // a 表示追加  w表示覆盖
    });
    return writeStream;
};

// 写访问日志
const accessWriteStream = createWriteStream('access.log');

function access(log) {
    console.log(1111, log)
    writeLog(accessWriteStream, log);
};

module.exports = {
    access,
}