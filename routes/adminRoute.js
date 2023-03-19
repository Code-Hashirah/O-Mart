const adminController=require('../controllers/admin/admin');
const router=require('express').Router();
const {isEmpty}=require('validator');
const {check}=require('express-validator');
const isAuth=require('../middleware/isAuth');
const isAdmin=require('../middleware/isAdmin')

router.post('/admin-add-user', [
    check('Email').notEmpty().withMessage('Email cannot be left blank').isEmail().withMessage('Invalid Email format').normalizeEmail(),
    check('Password').notEmpty().withMessage('Password is required').isAlphanumeric().withMessage('Password must alphabets and numbers').isLength({min:6}).withMessage('Password must be at last 6 characters long'),
    check('ConfirmPassword').notEmpty().withMessage('This field must be filled').custom((value, {req})=>{
        if(value !== req.body.Password){
            throw new Error('The passwords do not match');
        }
        return true;
    })
],
isAuth, isAdmin,adminController.addUser)

router.get('/admin-add-user' ,isAuth, isAdmin,adminController.addUserPage)

router.get('/admin-dashboard' ,isAuth, isAdmin,adminController.adminDash)

router.get('/admin-manage-user',isAuth, isAdmin, adminController.manageUser)

router.post('/admin-delete-user',isAuth, isAdmin,isAuth, isAdmin,adminController.deleteUser)

router.get('/admin-update-user/:id',isAuth,isAdmin,adminController.updateUserPage)
router.post('/admin-update-user',isAuth, isAdmin,adminController.updateUser)

module.exports=router;