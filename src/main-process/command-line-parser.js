const parseCommandLine = processArgv => {
  const dev = processArgv.some(val => val == '--development' || val == '-d')
  const save = processArgv.some(val => val == '--save' || val == '-s')

  return { dev, save }
}

module.exports = { parseCommandLine }
