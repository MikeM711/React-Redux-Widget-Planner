const Joi = require('joi');

module.exports = {
  validateBody: (schema) => {
    return (req,res, next) => {
      const result = Joi.validate(req.body, schema);
      if (result.error) {
        return res.status(400).json(result.error)
      }

      if (!req.value) { req.value = {}; }
      // The below will initialize req.value.body, which is what we use to extract the data in our controller (the following middleware)
      req.value['body'] = result.value;
      next();
    }
  },

  schemas: {
    authSchema: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required()
    })
  }
}