const AETERNUM = require('../model/aeternum')
const hash = require('object-hash')

module.exports = {
    async index(req, res){
        const aeternum = await AETERNUM.find()
        return res.json(aeternum)
    },

    async store(req, res){
        const {nameAeternum, historynameAeternum, urlnameAeternum} = req.body
        const codigoAeternum = hash.sha1(nameAeternum + String(Math.random()))

        const aeternum = await AETERNUM.findOneAndUpdate(
            {codigoAeternum},
            {$set: {codigoAeternum, nameAeternum, historynameAeternum, urlnameAeternum}},
            {upsert: true, new: true}
        )
        
        return res.json(aeternum)
    }
}

/**
 * codigoAeternum: String,
    nameAeternum: String,
    urlnameAeternum: String,
    historynameAeternum: String
 */