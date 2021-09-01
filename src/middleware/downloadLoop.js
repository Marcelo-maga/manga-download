const getPages = require('../functions/getPages')
const createPdf = require('../functions/createPdf')
const fs = require('fs-extra')

var ARGS = process.argv.slice(2)

module.exports = donwloadLoop = async (mangaData) => {

  var capIni = ARGS[1]
  var capFin = ARGS[2]
  var capAtu = capIni

  while(capAtu <= capFin){
    const releaseId = mangaData.chapters.find(number => number.number == `${capAtu}`)
    
    const mangaName = mangaData.name
    await getPages(releaseId.id_release, capAtu, mangaName)
    capAtu++
  }

  process.exit()
}
