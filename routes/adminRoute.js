const adminController=require('../controllers/admin/admin');
const router=require('express').Router();

router.get('/admin-add-user',adminController.addUserPage)
router.post('/admin-add-user',adminController.addUser)

router.get('/admin-dashboard',adminController.adminDash)




module.exports=router;