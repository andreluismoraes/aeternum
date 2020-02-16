const validatorEmail = require('email-validator')

module.exports = {
    emailvalidator(email){
        if(!validatorEmail.validate(email)){
            return {message: 'Email inválido'}
        }else{
            return {message: 'Email válido'}
        }
    }
}