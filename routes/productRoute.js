const productController=require('../controllers/product/product');
const router=require('express').Router();
const isAuth=require('../middleware/isAuth');
const isAdmin=require('../middleware/isAdmin')
router.get('/admin-add-product', isAuth, isAdmin,productController.addProductPage);
router.post('/admin-add-product',isAuth, isAdmin, productController.addProduct)

router.get('/admin-manage-product',isAuth, isAdmin, productController.manageProduct);

router.get('/admin-update-product/:id',isAuth, isAdmin,productController.updateProductPage);
router.post('/admin-update-product',isAuth, isAdmin, productController.updateProduct)







module.exports=router;
