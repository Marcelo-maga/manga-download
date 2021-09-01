const fs = require('graceful-fs')
const https = require('https')
const createPdf = require('./createPdf')

module.exports = async (imgs, key, capAtu, mangaName) => {
  let url = imgs[key]
  let timeout = 999 * 999
  https.get(url, { sessionTimeout: timeout, timeout: timeout }, (res) => {
    const fileStream = fs.createWriteStream(`temp/${key}.jpg`)
    res.pipe(fileStream)
    fileStream.on('finish', () => {
      fileStream.close()
    })
  })
  await createPdf('temp/', `${mangaName}`, `Capítulo-${capAtu - 1}.pdf`)
}