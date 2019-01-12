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

const os = require('os')

const getSystemInfo = () => {
  let systemOS
  let arch

  switch (process.platform) {
    case 'win32': systemOS = 'Windows'; break
    case 'linux': systemOS = 'Linux'; break
    case 'darwin': systemOS = 'MacOS'; break
  }

  switch (os.arch()) {
    case 'ia32': arch = '32-bit'; break
    case 'arm64': arch = '64-bit'; break
    case 'x32': arch = '32-bit'; break
    case 'x64': arch = '64-bit'; break
  }

  let platformRelease = os.release()

  return `${systemOS} ${platformRelease} ${arch}`
}

const { app } = require('electron').remote

const logEnvironmentInfo = () => {
  console.log(`Hidrogen version: v${app.getVersion()}`)
  console.log(`Node version: ${process.version}`)
  console.log(`Electron version: ${process.versions.electron}`)
  console.log(`PID: ${process.pid}`)
  console.log(`Running on ${getSystemInfo()}`)
  console.log(`Exec path: ${process.execPath}`)
}

module.exports = { readdir, readFile, writeFile, getSystemInfo, logEnvironmentInfo }
