const __ = require('../../util/response')
const Joi = require('joi')

class StateValidator {
  
  async createStateVal (req, res, next) {
    
    const schema = Joi.object().keys({
      stateName: Joi.string().required()
    })

    try {
      const result = await Joi.validate(req.body, schema)
      if (result) return next()
    } catch (error) {
      __.errorMsg(req, res, 400, error.details[0].message, undefined)
    };
  };

};

module.exports = new StateValidator()