const fs = require('graceful-fs')
const https = require('https')

module.exports = async (imgs, key, capAtu) => {
  let url = imgs[key]

  https.get(url, function(res) {
    const fileStream = fs.createWriteStream(`images/0${key}.jpg`)
    res.pipe(fileStream)
    fileStream.on("finish", function (){
      fileStream.close()
    })
  })
}