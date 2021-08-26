const puppeteer = require('puppeteer-extra')
const got = require('got');
const { scrollPageToBottom } = require('puppeteer-autoscroll-down')

const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())


async function getCaps(id, i) {
    var mangaData = {
      "chapters": [] 
    }

  try {

    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.setDefaultNavigationTimeout(0)
    await page.goto(`https://mangalivre.net/series/chapters_list.json?page=${i}&id_serie=${id}`)

    results = await page.evaluate(() => {
      return JSON.parse(document.querySelector("body").innerText ); 
    })

    await browser.close();

    if(results.chapters){
      mangaData.id_serie = results.chapters[0].id_serie;
      mangaData.name = results.chapters[0].name;
      mangaData.url_name = results.chapters[0].releases[Object.keys(results.chapters[0].releases)[0]].link.match(/(?<=ler\/).*?(?=\/)/)[0]

      for(let chapter of results.chapters){
        mangaData.chapters.push({
          "number": chapter.number,
          "id_release": chapter.releases[Object.keys(chapter.releases)[0]].id_release
        })
      }
    }
    return(
      mangaData
    )
  } catch (error) {
    console.log(error)
  }
}

async function getImages(release_id, url_name, capAtu) {
  
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()
  await page.setDefaultNavigationTimeout(0)
  await page.goto(`https://mangalivre.net/ler/${url_name}/online/${release_id}/capitulo-${capAtu}#/`)

  await page.click('a.orientation')
  await page.waitForTimeout(3000)

  // Recurso técnico alternativo!
  async function fe(){
    var steps = 999*1000
    while(true){
      for(i=1; i<10; i++){
        page.mouse.wheel({ deltaY: +steps })
        await page.waitForTimeout(1000)
      }
      break
    }
  }

  await fe()

}
module.exports = {
  getCaps: getCaps,
  getImages: getImages
}