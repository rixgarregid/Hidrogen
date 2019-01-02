const { parseCommandLine } = require('./command-line-parser')

const args = parseCommandLine(process.argv)

const HidrogenApp = require('./hidrogen-app')
const { app } = require('electron')

app.on('ready', () => { HidrogenApp.start(args) })
