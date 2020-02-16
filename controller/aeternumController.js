const AETERNUM = require('../model/aeternumModel')
const qrcode = require('qrcode')

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
    },

    async generateqrcode(req, res){

        const qr = await qrcode.toDataURL('')
        return res.json({message: 'qr code'})
    }
}

/**
 * codigoAeternum: String,
    nameAeternum: String,
    urlnameAeternum: String,
    historynameAeternum: String
 */