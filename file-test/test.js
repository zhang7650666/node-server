const fs = require('fs');
const path = require('path');

const fileName = path.resolve(__dirname, 'data.txt');

// 读取文件

// fs.readFile(fileName, (err, data) => {
//     if(err) {
//         console.log('err===', err);
//         return;
//     }
//     console.log(data.toString())
// })

// 写入文件
// const content = '越努力，越幸运\n';
// const opt = {
//     flag: 'a', // a是追加，  w 是覆盖
// }
// fs.writeFile(fileName, content, opt, (err) => {
//     if(err) {
//         console.log('err', err);
//         return;
//     }
//     console.log('写入文件成功')
// })

// 判断文件是否存在
fs.exists(fileName, (exist) => {
    console.log(exist)
})