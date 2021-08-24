const puppeteer = require('puppeteer-extra')

const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

async function getCaps(id) {
  var data = { "chapters": [] }

  try {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`https://mangalivre.net/series/chapters_list.json?page=1&id_serie=224`);

    innerText = await page.evaluate(() => {
      return JSON.parse(document.querySelector("body").innerText ); 
    })
    await browser.close();

    if(innerText.chapters){
      data.id_serie = innerText.chapters[0].id_serie;
      data.name = innerText.chapters[0].name;

      for(let chapter of innerText.chapters){
        data.chapters.push({
          "chapter_name": chapter.chapter_name,
          "number": chapter.number,
          "id_release": chapter.releases[Object.keys(chapter.releases)[0]].id_release
        })
      }
    }

    console.log(data)

  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  getCaps: getCaps
}