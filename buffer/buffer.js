const fsPromises = require('fs').promises
const path = require('path')


const readImage = async function (filePath) {
    const imageHandle = await fsPromises.open(path.resolve(__dirname, filePath), 'r')
    const image = await imageHandle.readFile()
    const imageBase64Url = image.toString('base64')
    return imageBase64Url
}

const base64Decode = async function(base64Url) {
    const base64DecodeDest = Buffer.from(base64Url, 'base64')

    const base64DecodeDestFile = await fsPromises.open('./test.png', 'w')
    base64DecodeDestFile.writeFile(base64DecodeDest)
}

readImage(path.resolve(__dirname, './icon.png')).then(imageBASe64Url => {
    base64Decode(imageBASe64Url)
})



