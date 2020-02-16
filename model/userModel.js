const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    emailUSER: String,
    senhaUSER: {
        type: String,
        select: false
    },
    tokenUSER: String
}) 

module.exports = mongoose.model('USER', userSchema)