const express = require('express')
const routes = require('../routes')
const data = require('../config/server')

const app = express()

app.use(express.json())

data.then(dados => dados.connec)

app.use(routes)

app.listen(3000)