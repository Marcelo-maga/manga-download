const donwload = require('./downloads')
const createPdf = require('./createPdf')

const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

module.exports = async (release_id, capAtu) => {
  
  // Função de scroll para carregar as imanges
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

  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  await page.setDefaultNavigationTimeout(0)
  await page.goto(`https://mangalivre.net/ler/null/online/${release_id}/capitulo-${capAtu}#/`)

  await page.click('a.orientation')
  await page.waitForTimeout(3000)

  await scroll()
  
  const imgs = await page.$$eval('.manga-image img[src]', imgs => imgs.map(img => img.getAttribute('src')))
  Object.keys(imgs).forEach( async function (key) {
    await donwload(imgs, key, capAtu)
    await createPdf('images/', '1.pdf')
  })  
  await browser.close()

}