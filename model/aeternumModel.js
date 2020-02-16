const mongoose = require('mongoose')

const aeternumSchema = new mongoose.Schema({
    codigoAeternum: String,
    nameAeternum: String,
    urlnameAeternum: String,
    historynameAeternum: String
})

module.exports = mongoose.model('aeternum', aeternumSchema)