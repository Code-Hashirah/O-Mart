const {validationResult} = require('express-validator')
const User=require('../../models/user')
const Bcrypt= require('bcrypt')
 exports.addUserPage=(req,res)=>{
    res.render('admin/addUser', {title:"Admin Add-user"})
 }

 exports.addUser=(req,res)=>{
    const {Email, Password, Name, Phone, Image, Role}=req.body;

    Bcrypt.hash(Password,12).then(hashedPassword=>{
        User.create({
            email:Email,
            password:hashedPassword,
            name:Name,
            role:Role,
            phone:Phone,
            image:Image
        }).then(user=>{
            req.session.save(()=>{
                  res.redirect('/admin-add-user')
            })
          
        }).catch(err=>{
            console.log(err);
        })
    })
 }

 exports.adminDash=(req,res)=>{
    res.render('admin/dashboard', {title:"Admin Dashboard"})
}