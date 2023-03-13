const adminController=require('../controllers/admin/admin');
const router=require('express').Router();

router.get('/admin-add-user',adminController.addUserPage)
router.post('/admin-add-user',adminController.addUser)

router.get('/admin-dashboard',adminController.adminDash)

router.get('/admin-manage-user', adminController.manageUser)

router.post('/admin-delete-user', adminController.deleteUser)

router.get('/admin-update-user/:id',adminController.updateUserPage)
router.post('/admin-update-user',adminController.updateUser)

module.exports=router;