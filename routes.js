const {Router} = require('express')
const multerConfig = require('./utils/imageGenerate')
const multer = require('multer')

const AETERNUM = require('./controller/aeternumController')

const routes = Router()

routes.get('/aeternum/:id', AETERNUM.index)
routes.post('/salvar', multer(multerConfig).single('file'), AETERNUM.store)

module.exports = routes