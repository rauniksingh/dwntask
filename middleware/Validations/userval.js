const __ = require('../../util/response')
const Joi = require('joi')

class UserValidator {
  
  async login (req, res, next) {
    
    const schema = Joi.object().keys({
      username: Joi.string().required(),
      password: Joi.string().required()
    })

    try {
      const result = await Joi.validate(req.body, schema)
      if (result) return next()
    } catch (error) {
      __.errorMsg(req, res, 400, error.details[0].message, undefined)
    };
  };

  async createUser (req, res, next) {

    const schema = Joi.object().keys({
        username: Joi.string().required(),
        password: Joi.string().required(),
        organisation: Joi.string().required(),
        designation: Joi.string().required()
      })
  
      try {
        const result = await Joi.validate(req.body, schema)
        if (result) return next()
      } catch (error) {
        __.errorMsg(req, res, 400, error.details[0].message, undefined)
      };

  };

};

module.exports = new UserValidator()