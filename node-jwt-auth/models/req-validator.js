
const Joi = require("@hapi/joi");

const registerValidation = data => {

    const schema = {
        firstname : Joi.string().min(4).required(),
        lastname : Joi.string().min(4).required(),
        username : Joi.string().min(4).required(),
        email: Joi.string().min(4).required().email(),
        password: Joi.string().min(4).required(),
        cpassword: Joi.any().valid(Joi.ref('password')).required().options({ language: { any: { allowOnly: 'must match password' } } })
    };
    return Joi.validate(data,schema);

}

const loginValidation = data =>{
    const schema = {
        username: Joi.string().min(4).required(),
        password: Joi.string().min(4).required()
    };

    return Joi.validate(data,schema);
}


module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;

