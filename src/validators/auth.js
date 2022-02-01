//access express-validator 
const { check, validationResult } = require('express-validator');

//check relevant form areas to make sure proper input is received
exports.validateSignupRequest = [
    check('firstName')
    .notEmpty()
    .withMessage('firstName is required'),
    check('lastName')
    .notEmpty()
    .withMessage('lastName is required'),
    check('lastName'),
    check('email')
    .isEmail()
    .withMessage('Valid Email is required'),
    check('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 character long')
];

//check relevant form areas to make sure proper input is received
exports.validateSigninRequest = [
    check('email')
    .isEmail()
    .withMessage('Valid Email is required'),
    check('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 character long')
];

//check vaildation result and show errors if any, otherwise proceed  
exports.isRequestValidated = (req, res, next) => {
    const errors = validationResult(req); //get the validation result
    //provide error message if there 
    if(errors.array().length > 0){
        return res.status(400).json({ error: errors.array()[0].msg })
    }
    next();
}