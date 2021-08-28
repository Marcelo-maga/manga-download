const fs = require('graceful-fs')
const https = require('https')
const createPdf = require('./createPdf')

module.exports = async (imgs, key, capAtu, mangaName) => {
  let url = imgs[key]

  https.get(url, async function(res) {
    const fileStream = fs.createWriteStream(`images/0${key}.jpg`)
    res.pipe(fileStream)
    fileStream.on("finish", function (){
      fileStream.close()
    })
  })
  await createPdf('images/', `${mangaName}`, `cap${capAtu}.pdf`)
}