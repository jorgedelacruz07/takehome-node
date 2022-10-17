const { squareOperation, absOperation, sameValues } = require('./utils/operations')
const { processCSV } = require('./utils/file')

const start = Date.now()
const filename = './src/data.csv'

processCSV(filename, sameValues)
  .then((data) => {
    data.map(d => console.log(d))
  })
  .catch((e) => console.log(e))
  .finally(() => {
    const end = Date.now()
    console.log(`\nExecution time: ${end - start}ms`)
  })
