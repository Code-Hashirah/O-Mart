const {validationResult} = require('express-validator')
const Product=require('../../models/products')

exports.addProductPage=(req,res)=>{
    res.render('products/addProduct',{title:"Admin Add-Product"})
}

exports.addProduct=(req,res)=>{
    const {Item, Price, Brand, Description, Image, Discount, Category}=req.body;
    const errors=validationResult(req);
    let imagepath = req.file.destination + req.file.filename
    Product.create({
        item:Item,
        price:Price,
        brand:Brand,
        description:Description,
        image:imagepath,
        discount:Discount,
        category:Category
        // userId:req.session.user.id
    }).then(product=>{
       res.redirect('/admin-add-product')
    }).catch(err=>{
        console.log(err)
    })
}

exports.manageProduct=(req,res)=>{
    Product.findAll().then(product=>{
        res.render('products/manageProduct',{Products:product, title:"Manage Products"})
    })
}

exports.updateProductPage=(req,res)=>{
    let id=req.params.id;
    Product.findByPk(id).then(products=>{
        res.render('products/updateProduct',{title:"Update product", Item:products})
    })
}

exports.updateProduct=(req,res)=>{
    const {Id,Item, Price, Brand, Description, Image, Discount, Category}=req.body;
    Product.findByPk(Id).then(Prod=>{
        Prod.item=Item,
        Prod.brand=Brand,
        Prod.description=Description,
        Prod.image=Image,
        Prod.discount=Discount,
        Prod.category=Category
        return Prod.save()
    }).then(product=>{
    return    res.redirect('/admin-manage-product')
    })
    .catch(err=>{
        console.log(err)
    })
}