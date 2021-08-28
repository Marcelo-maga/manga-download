const getCaps = require('../functions/getCaps')
const downloadLoop = require('./downloadLoop')

module.exports = apiPage = async (id) => {

  let mangaData = {
    "id_serie": id,
    "name": undefined,
    "chapters": []
  }

  for(let i = 1; ; i++){
    var results = await getCaps(id, i)
    
    if (!mangaData.name) { 
      mangaData.name = results.name
    }
    
    if (results.chapters.length > 0) {
      mangaData.chapters = mangaData.chapters.concat(results.chapters)
      continue
    }
    break
  }
  await downloadLoop(mangaData)
}
