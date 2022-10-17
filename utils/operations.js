const numberPattern = /^[0-9]/ // pattern for numbers
const getFirstElement = (row) => row[0]

const squareOperation = (row) => {
  if (numberPattern.test(Math.abs(getFirstElement(row)))) return Math.pow(getFirstElement(row), 2)
  return ''
}

const absOperation = (row) => {
  if (numberPattern.test(Math.abs(getFirstElement(row)))) return Math.abs(getFirstElement(row))
  return ''
}

const sameValues = (row) => getFirstElement(row)

module.exports = { squareOperation, absOperation, sameValues }