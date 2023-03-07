const authController=require('../controllers/user/auth');
const router=require('express').Router();

router.get('/sign-up',authController.signUpPage)

module.exports=router;