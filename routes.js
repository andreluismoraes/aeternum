const {Router} = require('express')

const AETERNUM = require('./controller/aeternumController')

const routes = Router()

routes.get('/', (req,res) =>{
    return res.json({message: 'ola mundo'})
})

module.exports = routes