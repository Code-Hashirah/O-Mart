const productController=require('../controllers/product/product');
const router=require('express').Router();
router.get('/admin-add-product',productController.addProductPage);
router.post('/admin-add-product', productController.addProduct)

router.get('/admin-manage-product', productController.manageProduct);







module.exports=router;
