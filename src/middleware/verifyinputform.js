const Joi = require("@hapi/joi");

let verifyinputform = (req, res, next) => {
  const schema = Joi.object({
    password: Joi.string(),
    // //repeat_password: Joi.ref("password"),
    year: Joi.number().integer().min(1900).max(2013),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "vn"] },
    }),
    // month: Joi.number().integer().min(1).max(12),
    // quarter: Joi.number().integer().min(1).max(4),
    // status: Joi.number().integer().min(1).max(12),
    // size: Joi.number().integer(),
    // page: Joi.number().integer(),
    // amount: Joi.number().integer(),
    // quantity: Joi.number().integer(),
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    console.log(error.details[0].message);
    return res.json({
      message: "Nhập đúng các trường theo hướng dẫn",
    });
  }
};
module.exports = {
  verifyinputform,
};
