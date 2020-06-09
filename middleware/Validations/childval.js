const __ = require('../../util/response')
const Joi = require('joi')

class ChildValidator {
  
  async createChildVal (req, res, next) {
    
    const schema = Joi.object().keys({
        name: Joi.string().required(),
        sex: Joi.string().valid('male', 'female').required(),
        dob: Joi.date().optional(),
        fatherName: Joi.string().optional(),
        motherName: Joi.string().optional(),
        districtId: Joi.string().required(),
        stateId: Joi.string().required(),
        photo: Joi.string().optional(),
    })

    try {
      const result = await Joi.validate(req.body, schema)
      if (result) return next()
    } catch (error) {
      __.errorMsg(req, res, 400, error.details[0].message, undefined)
    };
  };

};

module.exports = new ChildValidator()