const path = require('path')
const fs = require('fs')
const webp = require('webp-converter')

const directoryPath = path.join(__dirname, '../static/assets/images')

if (!fs.existsSync(path.join(__dirname, '../static/assets/webps'))) {
  fs.mkdirSync(path.join(__dirname, '../static/assets/webps'))
}

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    return console.error('Unable to scan directory: ' + err)
  }
  files.forEach((file, index) => {
    const fileName = file.split('.')[0] || 'image-' + index
    const imagePath = `./static/assets/images/${file}`
    const webpPath = `./static/assets/webps/${fileName}.webp`

    const res = webp.cwebp(imagePath, webpPath, '-q 80')

    res.then(() => {
      console.info(`${imagePath} Converted to Webp.`)
    })
  })
})
