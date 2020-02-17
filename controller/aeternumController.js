const AETERNUM = require('../model/aeternumModel')
const USER = require('../model/userModel')
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

        const {emailUSER} = req.body

        const user = await USER.find({emailUSER})

        const id = user.pop(data => data._id)

        /**convertendo em base64 */
        const base64 = buffer.toString('base64');

        let {nameAeternum, historynameAeternum, codigo} = req.body

        if (!codigo){
            codigo = 'aeternum'+ Math.random() * 10
        }
        
        // /**salvando */
        const aeternum = await AETERNUM.findOneAndUpdate(
            {codigoAeternum: codigo},
            {$set: {userAeternum: id, nameAeternum, urlnameAeternum: base64, historynameAeternum}},
            {upsert: true, new: true}
        )

        return res.json(aeternum)
    },

    async generateqrcode(req, res){
        const url = 'http://localhost:3000'

        const {codigoAeternum} = req.body

        const qr = await qrcode.toDataURL(`${url}${codigoAeternum}`)

        const aeternum = await AETERNUM.findOneAndUpdate(
            {codigoAeternum},
            {$set: {qrcodeAeternum: qr }},
            {upsert: true, new: true}
        )

        return res.json(aeternum)
    }
}

/**    userAeternum: {
        type: mongoose.Types.ObjectId,
        ref: 'USER'
    },
    codigoAeternum: String,
    nameAeternum: String,
    urlnameAeternum: String,
    historynameAeternum: String,
    qrcodeAeternum: String, */