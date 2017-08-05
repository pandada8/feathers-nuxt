const { Nuxt, Builder } = require('nuxt')
const config = require('../../nuxt.config.js')
const logger = require('winston')

const nuxt = new Nuxt(config)
const resolve = require('path').resolve

config.dev = process.env.NODE_ENV !== 'production'

if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build()
    .then(() => process.emit('nuxt:build:done'))
    .catch((err) => {
      logger.error(err)
      process.exit(1)
    })
} else {
  process.nextTick(() => process.emit('nuxt:build:done'))
}

module.exports = nuxt
