const fs = require('fs-extra')
const image_size = require('image-size')
const pdfkit = require('pdfkit');
const naturalCompare = require("natural-compare-lite")

module.exports = async (folder, outputPath) => {
  let doc = new pdfkit
  fs.readdir(folder, function (_, files){
    files.sort(naturalCompare).forEach( function (file, index){
      const filePath = `${folder}/${file}`;
        const size = image_size(filePath);
        if (index === 0) {
          doc = new pdfkit({
            size: [size.width, size.height]
          });
        } else {
          doc.addPage({ size: [size.width, size.height] });
        }

        doc.image(filePath, 0, 0, { width: size.width, height: size.height });
    });
    doc.pipe(fs.createWriteStream(outputPath));
    doc.end();
  })
}
