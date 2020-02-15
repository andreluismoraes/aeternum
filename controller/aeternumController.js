const AETERNUM = require('../model/aeternum')

module.exports = {
    async index(req, res){
        const aeternum = await AETERNUM.find()
        return res.json(aeternum)
    }
}