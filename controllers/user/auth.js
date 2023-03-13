const {validationResult} = require('express-validator')
const User=require('../../models/user')
const Bcrypt= require('bcrypt')
 const Session=require('../../models/session')
 const session = require('express-session');
exports.signUpPage=(req,res)=>{
    let errors=req.flash('errors');
    res.render('pages/register', {title:'Sign-Up', errorMessage:errors, oldInput:req.flash ('oldInput')})
}

exports.signUp=(req,res)=>{
    const {Email, Password}=req.body;
    let role="User";
let errors=validationResult(req)
if(!errors.isEmpty()){
    const oldInput={
        email:Email,
        password:Password,
        confirmPassword:req.body.confirmPassword
    }
    req.flash('oldInput', oldInput);
    req.flash('errors', errors.array())
    // console.log(err)
    req.session.save(()=>{
        res.redirect('/sign-up')
            })
    // // inserting to DB
    // User.create({
    //     email:Email,
    //     password:Password,
    //     role:role,
    // }).then(user=>{
    //     req.session.save(()=>{
    //           res.redirect('/sign-in')
    //     })
      
    // }).catch(err=>{
    //     console.log(err);
    // })
}

// else part 
else{

     // inserting to DB
// Hashing the password 
Bcrypt.hash(Password,12).then(hashedPassword=>{
    User.create({
        email:Email,
        password:hashedPassword,
        role:role,
    }).then(user=>{
        req.session.save(()=>{
              res.redirect('/sign-in')
        })
      
    }).catch(err=>{
        console.log(err);
    })
})
}

    
}
// login controller 
exports.signInPage=(req,res)=>{
    let userErr=req.flash('loginErrors')
    let userError=req.flash('userErr')
res.render('pages/login',{title:'Sign-In',loginErr:userErr, validError:userError})
}

exports.signIn=(req,res)=>{
    const {Email, Password}=req.body
    errors= validationResult(req);

    if(! errors.isEmpty()){
        req.flash('loginErrors', errors.array())
        return req.session.save(()=>{
            res.redirect('/sign-in')
        })
    }
    User.findOne({
        Where:{
            email:Email
            // role:"Admin"
        }
    })
    .then(users=>{
        if(!users){
            req.flash('userErr', 'User does not exist')
            return req.session.save(()=>{
                res.redirect('/sign-in')
            })
        }
        Bcrypt.compare(Password, users.password)
        .then(matched=>{
            if (!matched){
                req.flash('userErr', 'Invalid username or password')
                console.log(matched)
                console.log(users.password)
                return req.session.save(()=>{
                    res.redirect('/sign-in')
                })
            }
            req.session.isLoggedIn=true;
              req.session.user=users
            res.redirect('/')
        })
    }).catch(err=> console.log(err))
  
}

exports.dashBoard=(req,res)=>{
   let users= req.session.user
//    res.json(user.email)
    res.render('pages/index',{title:'Dashboard',Users:users} )
}