const {validationResult} = require('express-validator')
const Product=require('../../models/products')

exports.addProductPage=(req,res)=>{
    res.render('products/addProduct',{title:"Admin Add-Product"})
}

exports.addProduct=(req,res)=>{
    const {Item, Price, Brand, Description, Image, Discount, Category}=req.body;
    Product.create({
        item:Item,
        price:Price,
        brand:Brand,
        description:Description,
        image:Image,
        discount:Discount,
        category:Category
    }).then(product=>{
       res.redirect('/admin-add-product')
    })
}

exports.manageProduct=(req,res)=>{
    Product.findAll().then(product=>{
        res.render('products/manageProduct',{Products:product, title:"Manage Products"})
    })
}