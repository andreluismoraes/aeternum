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
    },

    async logar(req, res){
        const {emailUSER, senha} = req.body

        if(!emailUSER || !senha){
            return res.json({message: 'Digite o seu email ou senha'})
        }

        const {message} = validateEmail.emailvalidator(emailUSER)

        if(message == 'Email inválido'){
            return res.json({message: 'Email inválido'})
        }

        const existe = await USER.find(
            {emailUSER}
        ).select('senhaUSER')

        if(existe.length == 0){
            return res.json({message: 'Realize o cadastro'})
        }

        /**pegando só a senha */
        const password = existe.pop(data => data.senhaUSER)

        /**pegando só o id */
        const id = existe.pop(data => data._id)

        /**comparando senha */
        if(!bcrypt.compareSync(senha, password.senhaUSER)){
            return res.json({message: 'Login ou senha inválido'})
        }

        /**gerando token expirará em 1 dia ou seja 86400 segundos*/
        const tokenUSER = token.sign({id}, process.env.secret, {expiresIn: 86400})

        const user = await USER.findOneAndUpdate(
            //search
            {emailUSER},
            //atualizando ou inserindo os dados
            {$set: {tokenUSER}},
            //habilitando o upsert e retornando caso for novo
            {upsert: true, new: true}
        )

        return res.json(user)
    }
}

/**    emailUSER: String,
    senhaUSER: String,
    tokenUSER: String */