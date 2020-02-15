const {Router} = require('express')

const AETERNUM = require('./controller/aeternumController')

const routes = Router()

routes.get('/', AETERNUM.index)

module.exports = routes