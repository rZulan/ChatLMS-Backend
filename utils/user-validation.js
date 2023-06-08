const JOI = require("joi");

const validator = (schema) => (payload) => schema.validate(payload, { abortEarly: false });

const schema = JOI.object({
    firstName: JOI.string().required(),
    lastName: JOI.string().required(),
    username: JOI.string().min(5).required(),
    email: JOI.string().email().required(),
    password: JOI.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    role: JOI.string().valid("teacher", "student").required()
});

exports.validateSignup = validator(schema);
