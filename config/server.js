const mongoose = require('mongoose')
require('dotenv').config()

const username = process.env.loginDataBase
const password = process.env.passwordDataBase
const dataBase = 'aeternum'


const server = mongoose.connect(`mongodb+srv://${username}:${password}@server-dshxz.mongodb.net/${dataBase}?retryWrites=true&w=majority`, 
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
        useFindAndModify: false
    }
)

module.exports = server