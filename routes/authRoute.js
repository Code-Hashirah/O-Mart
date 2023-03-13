const authController=require('../controllers/user/auth');
const router=require('express').Router();
const {isEmpty}=require('validator');
const {check}=require('express-validator/check');
// Sign up route 
router.get('/sign-up',authController.signUpPage)
router.post('/sign-up',[
    check('Email').notEmpty().withMessage('Your email is required').isEmail().withMessage('Invalid Email').normalizeEmail(),
    check('Password').notEmpty().withMessage('Password  is required').isAlphanumeric().withMessage('password must contain alphabets and numbers').isLength({min:6}).withMessage('Your password length must be greater than 6 characters'),
    check('ConfirmPassword').notEmpty().withMessage('Confirm password must be filled').custom((value, {req})=>{
        if(value !==req.body.Password){
            throw new Error('The password does not match');
        }
        return true;
    })
]
,authController.signUp)

// sign in route 
router.get('/sign-in',authController.signInPage)
router.post('/sign-in',[
    check('Email').notEmpty().withMessage('Your email is required  to login').isEmail().trim(),
    check('Password').notEmpty().withMessage('Password cannot be empty')
],authController.signIn)

router.get('/',authController.dashBoard)

module.exports=router;