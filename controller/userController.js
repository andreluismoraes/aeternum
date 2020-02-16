const USER = require('../model/userModel')
const token = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const validateEmail = require('../utils/validatorEmail')

module.exports = {
    async index(req, res){
        const user = await USER.find()
        return res.json(user)
    },

    async store(req, res){
        const {emailUSER, senha} = req.body

        const {message} = validateEmail.emailvalidator(emailUSER)

        if(message == 'Email inválido'){
            return res.json({message: 'Email inválido'})
        }

        const senhaUSER = bcrypt.hashSync(senha, 10)

        const existe = await USER.find(
            {emailUSER}
        )

        /**se não existir este email cria um outro */
        if(existe.length == 0){
            const user = await USER.findOneAndUpdate(
                //search
                {emailUSER},
                //atualizando ou inserindo os dados
                {$set: {senhaUSER, emailUSER}},
                //habilitando o upsert e retornando caso for novo
                {upsert: true, new: true}
            )

            return res.json(user)
        }else{
            return res.json({message: 'Usuario já existe'})
        }
    }
}

/**    emailUSER: String,
    senhaUSER: String,
    tokenUSER: String */