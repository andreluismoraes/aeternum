const {Router} = require('express')
const multerConfig = require('./utils/imageGenerate')
const multer = require('multer')
const login = require('./middleware/login')

/**controllers */
const AETERNUM = require('./controller/aeternumController')
const USER = require('./controller/userController')

const routes = Router()

/**rotas de aeternum */
routes.get('/aeternum/:id', AETERNUM.index)
routes.post('/salvar', multer(multerConfig).single('file'), AETERNUM.store)
routes.get('/qrcode', AETERNUM.generateqrcode)

/**rotas de usuarios */
routes.get('/user', USER.index)
routes.post('/user', USER.store)
routes.post('/logar', USER.logar)


module.exports = routes