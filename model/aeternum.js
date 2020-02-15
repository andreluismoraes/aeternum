const mongoose = require('mongoose')

const aeternumSchema = new mongoose.Schema({
    nameAeternum: String,
    urlnameAeternum: String,
    historynameAeternum: String
})

module.exports = mongoose.model('aeternum', aeternumSchema)