const parseCommandLine = processArgv => {
  const dev = processArgv.some(val => val == '--development' || val == '-d')

  return { dev }
}

const args = parseCommandLine(process.argv)

const HidrogenApp = require('./hidrogen-app')
const { app } = require('electron')

app.on('ready', () => {
  HidrogenApp.start(args)
})
