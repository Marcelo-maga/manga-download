var ARGS = process.argv.slice(2)
const functions = require('./functions')

const puppeteer = require('puppeteer-extra')
process.setMaxListeners(Infinity)

const exprsss = require('express')
const bodyParser = require('body-parser')

const app = exprsss()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get(`/main/:id/`, async (req, res) => {
  const id = req.params.id

  let mangaData = {
    "id_serie": undefined,
    "name": undefined,
    "chapters": []
  }
  
  for(let i = 1; ; i++){
    var results = await functions.getCaps(id, i)
  
    if (!mangaData.name) { 
      mangaData.id_serie = results.id_serie
      mangaData.name = results.name
    }
  
    if (results.chapters.length > 0) {
      mangaData.chapters = mangaData.chapters.concat(results.chapters)
      continue
    }
    break
  }
  console.log(mangaData)
});

app.listen(3000, () => {
  console.log("Mangá Donwload by Marcelo-maga")
})

// Main function
async function mangaDownload() {

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`http://localhost:3000/main/${ ARGS[0] }`);

  await browser.close();
}
mangaDownload()
