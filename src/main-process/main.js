const parseCommandLine = processArgv => {
  const dev = processArgv.some(val => val == '--development' || val == '-d')

  return {
    dev
  }
}

const args = parseCommandLine(process.argv)

const { app } = require('electron')
const HidrogenApp = require('./hidrogen-app')

app.on('ready', () => {
  HidrogenApp.start(args)
})
