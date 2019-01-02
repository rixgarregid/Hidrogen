const binarySearchInt = (arr, item) => {
  let low = 0
  let high = arr.length - 1

  while (low <= high) {
    let mid = Math.floor((low + high) / 2)
    let guess = arr[mid]

    if (guess === item) {
      return arr[mid]
    } else if (guess > item) {
      high = mid - 1
    } else {
      low = mid + 1
    }
  }

  return null
}

// https:://github.com/posabsolute/javascript-binary-search-algorithm/blob/master/searchBinary.js
const binarySearchIterative = (item, array) => {
  let arrayLength = array.length
  let itemLetterNumber = item.length
}

const fs = require('fs')
const { promisify } = require('util')

const readdir = promisify(fs.readdir)
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

module.exports = { readdir, readFile, writeFile }
