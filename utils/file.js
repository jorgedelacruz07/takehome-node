const fs = require('fs')
const { parse } = require('csv-parse')

const readFile = async (filename) => {
  let files = []
  return new Promise((resolve, reject) => {
    fs.createReadStream(filename)
      .pipe(parse({ delimiter: ',', from_line: 1 }))
      .on('data', function (row) {
        files.push(row)
      })
      .on('error', function (err) {
        console.log(`Error reading file called '${filename}'`)
        reject(err)
      })
      .on('end', function () {
        resolve(files)
      })
  })
}

const processCSV = async (type, filename, transformerFunction) => {
  let results = []
  let rows = filename
  if (type === 'machine') rows = await readFile(filename)
  rows?.map((row) => {
    results.push(transformerFunction(row))
  })
  return results
}

module.exports = { readFile, processCSV }