const getPages = require('../functions/getPages')

var ARGS = process.argv.slice(2)

module.exports = donwloadLoop = async (mangaData) => {

  var capIni = ARGS[1]
  var capFin = ARGS[2]

  while(capIni <= capFin){
    let capAtu = capIni
    
    const releaseId = mangaData.chapters.find(number => number.number == `${capAtu}`)
    
    await getPages(releaseId.id_release, capAtu)
    capAtu++
    capIni++
  }
}
