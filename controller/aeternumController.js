const AETERNUM = require('../model/aeternum')

module.exports = {
    async index(req, res){
        const {id} = req.params

        const aeternum = await AETERNUM.find(
            {codigoAeternum: String(id)}
        )
            
        res.json(aeternum)
    },

    async store(req, res){
        /**pegando a imagem */
        const {buffer} = req.file

        /**convertendo em base64 */
        const base64 = buffer.toString('base64');

        let {nameAeternum, historynameAeternum, codigo} = req.body

        if (!codigo){
            codigo = 'aeternum'+ Math.random() * 10
        }
        
        // /**salvando */
        const aeternum = await AETERNUM.findOneAndUpdate(
            {codigoAeternum: codigo},
            {$set: { nameAeternum, urlnameAeternum: base64, historynameAeternum}},
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