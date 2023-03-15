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

exports.manageUser=(req,res)=>{
    User.findAll().then(users=>{
        res.render('admin/manageUser', {Users:users,title:"Manage Users"})
    })
}

exports.deleteUser=(req,res)=>{
    const {ID}=req.body;
    User.findByPk(ID). then(user=>{
      return  user.destroy();
    }).then(user=>{
        res.redirect('/admin-manage-user')
    }).catch(err=>{
        console.log(err)
    })
}

exports.updateUserPage=(req,res)=>{
    const id=req.params.id;
    return  User.findByPk(id).then(users=>{
        res.render('admin/updateUser', {title:"Update User", Person:users})
    })
    .catch(err=>{
        console.log(err)
    })
}

exports.updateUser=(req,res)=>{
    const {ID,Email, Name, Phone, Image, Role}=req.body;                                                                                                                                                                                                
        User.findByPk(ID).then(user=>{
            user.email=Email,
            user. name=Name,
            user.role=Role,
            user. phone=Phone,
            user.image=Image
            return user.save()
        }).then(user=>{
            res.redirect('/admin-manage-user')
        })
        .catch(err=>{
            console.log(err)
        })

}