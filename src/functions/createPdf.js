const fs = require('fs-extra')
const image_size = require('image-size')
const pdfkit = require('pdfkit');
const naturalCompare = require("natural-compare-lite")

module.exports = async function(folder, mangaName, outputPath) {
  var pdf = new pdfkit({ autoFirstPage: false })
  var dir = `${mangaName}`
  try {
    fs.readdir('temp/',  async function (_,files) {
      files.sort(naturalCompare).forEach( async function (file) {
        const filePath = `${folder}/${file}`
          const size = image_size(filePath)
          pdf.addPage({ size: [size.width, size.height] })
          pdf.image(filePath, 0, 0, { width: size.width, height: size.height })
      })
      fs.ensureDirSync(dir)
      pdf.pipe(fs.createWriteStream(`${dir}/${outputPath}`))
      pdf.end()
    })
    fs.emptyDirSync('temp/')
  } catch (error) {
    console.log(error)
  }
}
