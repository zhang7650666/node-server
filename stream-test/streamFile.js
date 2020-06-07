const fs = require('fs');
const path = require('path');

const fileName1 = path.resolve(__dirname, './data.txt');
const fileName2 = path.resolve(__dirname, './data-back.txt');

const readStream = fs.createReadStream(fileName1);

const writeStream = fs.createWriteStream(fileName2);

readStream.pipe(writeStream);
readStream.on('data', (chunk) => {
    console.log(chunk.toString())
});


readStream.on('end', () => {
    console.log('接收结束');
})

