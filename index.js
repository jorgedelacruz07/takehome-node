const { squareOperation, absOperation, sameValues } = require('./utils/operations')
const { processCSV } = require('./utils/file')
const axios = require('axios')

const start = Date.now()

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
})

readline.question(`Where is the url (machine/cloud)? `, async (csvUrl) => {
  if (csvUrl.includes('http')) {
    await axios.get(csvUrl).then(async (res) => {
      const { data } = res
      const array = data.split('\r\n')
      let rows = []
      array.map((a) => {
        const newArray = a.split(',')
        if (newArray.length && newArray[0]) rows.push(newArray)
      })
      await processCSV('cloud', rows, squareOperation)
        .then((data) => {
          data.map(d => console.log(d))
        })
        .catch((e) => console.log(e))
        .finally(() => {
          const end = Date.now()
          console.log(`\nExecution time: ${end - start}ms`)
        })
    })
  } else {
    await processCSV('machine', csvUrl, squareOperation)
      .then((data) => {
        data.map(d => console.log(d))
      })
      .catch((e) => console.log(e))
      .finally(() => {
        const end = Date.now()
        console.log(`\nExecution time: ${end - start}ms`)
      })
  }

  readline.close()
})


// https://www.sample-videos.com/csv/Sample-Spreadsheet-10-rows.csv
// /Users/jorgedelacruz07/Projects/Personal/encora/src/data.csv