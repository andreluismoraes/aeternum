const mongoose = require('mongoose')

const aeternumSchema = new mongoose.Schema({
    userAeternum: {
        type: mongoose.Types.ObjectId,
        ref: 'USER'
    },
    codigoAeternum: String,
    nameAeternum: String,
    urlnameAeternum: String,
    historynameAeternum: String,
    qrcodeAeternum: String,
})

module.exports = mongoose.model('aeternum', aeternumSchema)