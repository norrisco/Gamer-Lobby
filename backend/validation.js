const Joi = require('@hapi/joi');

const registerValidation =  (data) => {
    const schema = Joi.object({
        username: Joi.string()
                .alphanum()
                .min(6)
                .max(30)
                .required(),
        password: Joi.string()
                .min(6)
                .max(1024)
                .required()
    });
    
    return schema.validate(data);

};

const loginValiation = (data) => {
    const schema = Joi.object({
        username: Joi.string()
                .alphanum()
                .min(6)
                .max(30)
                .required(),
        password: Joi.string()
                .min(6)
                .max(1024)
                .required()
    });
    
    return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValiation = loginValiation;