const exprsss = require('express')
const bodyParser = require('body-parser')
const puppeteer = require('puppeteer-extra')

var ARGS = process.argv.slice(2)

const app = exprsss()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

process.setMaxListeners(Infinity)


const apiPage = require('./middleware/apiPage')

app.get(`/:id/`, async (req) => {

  const idSerie = req.params.id
  await apiPage(idSerie)
  process.exit()

})

app.listen(3000, () => {  
  console.log(" --- Manga Download by Marcelo-maga --- ")
})

// Main function
async function mangaDownload() {

  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.setDefaultNavigationTimeout(0)
  await page.goto(`http://localhost:3000/${ ARGS[0] }/`)

  await browser.close()
}

mangaDownload()
