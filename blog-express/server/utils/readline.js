const fs = require('fs');
const path = require('path');
const readline = require('readline');

const resolve = (filename) => {
    return path.resolve(__dirname, '../logs/', filename);
}

// 读取文件
const readStream = fs.createReadStream(resolve('access.log'));

const rl = readline.createInterface({
    input: readStream,
});

let chromeNum = 0;
let sum = 0;

rl.on('line', (lineData) => {
    if(!lineData){
        return;
    }
    sum ++;
    const temArr = lineData.split('--');
    if(temArr[2] && temArr[2].indexOf('Chrome') !== -1) {
        chromeNum ++;
    }
});

rl.on('close', () => {
    console.log('chrome 的占比：', chromeNum / sum)
})