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
    check('Email').notEmpty().withMessage('Your email is required  to login').isEmail(),
    check('Password').notEmpty().withMessage('Password cannot be empty')
],authController.signIn)

router.get('/',authController.dashBoard)

router.post('/logout',authController.logout)

// reset passwor route 
router.get('/reset-password',authController.resetPasswordPage)

router.post('/reset-password',[
    check('Email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format').normalizeEmail(),
    check('OldPassword').notEmpty().withMessage('Password is required'),
    check('NewPassword').notEmpty().withMessage('Field cannot be blank').custom((value, {req})=>{
        if(value===req.body.OldPassword){
            throw new Error('You cannot use the same password again')
        }
        return true;
    }).isAlphanumeric().withMessage('Password must contain alphanumeric characters').isLength({min:6}).withMessage('New password must be six or more characters long'),
    check('ConfirmPassword').custom((value, {req})=>{
        if(value!==req.body.NewPassword){
            throw new Error('Pasword does not match')
        }
        return true;
    }).notEmpty().withMessage('Filed is required')
],authController.resetPassword)

// forgot password route 
router.get('/forgot-password',authController.forgotPasswordPage)

router.post('/forgot-password',
    check('Email', 'Email is required or invalid').notEmpty().isEmail().normalizeEmail()
, authController.forgotPassword)


router.get('/retrieve-password/:token',authController.retrievePasswordPage)
router.post('/retrieve-password',authController.retrievePassword)

module.exports=router;