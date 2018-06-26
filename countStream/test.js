const countStream = require('./countStream')
const fs = require('fs')
const { resolve } = require('path')
const count = new countStream('class', resolve(__dirname, './countStream.js'))

count.on('total', (res) => {
    console.log(res)
})

const input = fs.createReadStream(resolve(__dirname, './countStream.js'))

input.pipe(count)
