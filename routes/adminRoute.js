const adminController=require('../controllers/admin/admin');
const router=require('express').Router();
const {isEmpty}=require('validator');
const {check}=require('express-validator');

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
adminController.addUser)

router.get('/admin-add-user',adminController.addUserPage)

router.get('/admin-dashboard',adminController.adminDash)

router.get('/admin-manage-user', adminController.manageUser)

router.post('/admin-delete-user', adminController.deleteUser)

router.get('/admin-update-user/:id',adminController.updateUserPage)
router.post('/admin-update-user',adminController.updateUser)

module.exports=router;