const nuxt = require('./nuxt')

module.exports = function () {
  const app = this

  // Use Nuxt's render middleware
  app.use((req, res, next) => {
    // fix the auth callback
    if (req.url.match(/^\/auth\//)) {
      next()
      return
    }
    switch (req.accepts('html', 'json')) {
      case 'json':
        next()
        break
      default:
        nuxt.render(req, res, next)
    }
  })
  // FIXME: find the right order to put the handler and prevent hijack the google login link
}
