const {check} = require('express-validator')

exports.signUpValidator = [
    check('name')
        .not()
        .isEmpty()
        .withMessage('Name is required'),
    check('email')
        .isEmail()
        .withMessage('Must be a Valid Email address'),
    check('password') 
        .isLength({min:6})
        .withMessage('Password must be atleast 6 character long')       
]

exports.signInValidator = [
    check('email')
        .isEmail()
        .withMessage('Must be a Valid Email address'),
    check('password') 
        .isLength({min:6})
        .withMessage('Password does not match')       
]