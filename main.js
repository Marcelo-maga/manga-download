const puppeteer = require('puppeteer-extra')
const fs = require('fs')
const https = require('https')
const ImagesToPDF = require('images-pdf')

const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

async function getCaps(id, i) {

    var mangaData = {
      "chapters": [] 
    }

    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.setDefaultNavigationTimeout(0)
    await page.goto(`https://mangalivre.net/series/chapters_list.json?page=${i}&id_serie=${id}`)

    results = await page.evaluate(() => {
      return JSON.parse(document.querySelector("body").innerText ); 
    })

    await browser.close()

    if(results.chapters){
      mangaData.id_serie = results.chapters[0].id_serie;
      mangaData.name = results.chapters[0].name;

      for(let chapter of results.chapters){
        mangaData.chapters.push({
          "number": chapter.number,
          "id_release": chapter.releases[Object.keys(chapter.releases)[0]].id_release
        })
      }
    }
    return mangaData
}

async function getImages(release_id, capAtu) {

  // função de scroll para carregar as páginas
  async function scroll(){
    let steps = 9999*1000
    while(true){
      for(i=1; i<25; i++){
        page.mouse.wheel({ deltaY: +steps })
        await page.waitForTimeout(1000)
      }
      break
    }
  }

  // função donwload
  async function donwload(imgs, key) {
    let url = imgs[key]
    https.get(url, function(res) {
      const fileStream = fs.createWriteStream(`images/cap${capAtu}-page${key}.jpg`)
      res.pipe(fileStream)
      fileStream.on("finish", function (){
        fileStream.close()
      })
    })
  }
  
  // função de gerar o pdf
  async function createPdf(){

  }

  // Inicio da função
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  await page.setDefaultNavigationTimeout(0)
  await page.goto(`https://mangalivre.net/ler/null/online/${release_id}/capitulo-${capAtu}#/`)

  await page.click('a.orientation')
  await page.waitForTimeout(3000)

  await scroll()
  
  const imgs = await page.$$eval('.manga-image img[src]', imgs => imgs.map(img => img.getAttribute('src')))
  Object.keys(imgs).forEach( async function (key) {
    await donwload(imgs, key)
  })  
  await browser.close()

  new ImagesToPDF.ImagesToPDF().convertFolderToPDF('images/', 'file.pdf')
}


module.exports = {
  getCaps: getCaps,
  getImages: getImages
}