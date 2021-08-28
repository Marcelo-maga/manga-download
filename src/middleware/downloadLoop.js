const getPages = require('../functions/getPages')
const fs = require('fs-extra')

var ARGS = process.argv.slice(2)

module.exports = donwloadLoop = async (mangaData) => {

  var capIni = ARGS[1]
  var capFin = ARGS[2]


  for(let capAtu = capIni; capIni <= capFin; capAtu++){
    const releaseId = mangaData.chapters.find(number => number.number == `${capAtu}`)
    
    const mangaName = mangaData.name
    await getPages(releaseId.id_release, capAtu, mangaName)
    fs.emptyDirSync('images/')
  }
}
