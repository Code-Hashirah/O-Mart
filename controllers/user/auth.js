const {validationResult} = require('express-validator/check')
const bycrypt = require('bcrypt')
const User=require('../../models/user')
const bcrypt= require('bcrypt')
const nodemailer=require('nodemailer');
//  const Session=require('../../models/session')
const crypto=require('crypto')
const session = require('express-session');
exports.signUpPage=(req, res)=>{
    let errors=req.flash('errors');
    res.render('pages/register', {title:'Sign-Up', errorMessage:errors, oldInput:req.flash('oldInput')})
}

exports.signUp=(req,res)=>{
    const {Email, Password}=req.body;
    // let role="User";
let errors=validationResult(req)
if(!errors.isEmpty()){
    const oldInput ={
        email : Email,
        password : Password,
        confirmPassword:req.body.confirmPassword
    }
    req.flash('oldInput', oldInput);
    req.flash('errors', errors.array())
    // console.log(err)
  return  req.session.save(()=>{
      return  res.redirect('/sign-up')
            })
}
     // inserting to DB
// Hashing the password 
bcrypt.hash(Password,12).then(hashedPassword=>{
    User.create({
        email:Email,
        password:hashedPassword,
        role:"User",
    }).then(user=>{
        const email={
            to:[user.email, 'kabirajibad@yahoo.com'],
            from:{
                name: 'O-Mart',
                email:'info@omartstores.com.ng'
            },
            subject: 'Welcome, thank you for signing up with O-Mart stores',
            html:`
            <h2>Welcome ${user.email}</h2>
            `
        }

        var transport = nodemailer.createTransport({
            host:"sandbox.smtp.mailtrap.io",
            port: 2525,
            auth:{
                user: "58b42af4ae2024",
                pass: "822d08109dd72d"
            }
        })
        transport.sendMail(email).then((response)=>{
            res.redirect('/sign-in')
        }).catch(err=>{
            console.log(err)
        })
        // req.session.save(()=>{
        //       res.redirect('/sign-in')
        // })
      
    }).catch(err=>{
        console.log(err);
    })
}).catch(err=>{
    console.log(err)
})


    
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
        where:{
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
     bcrypt.compare(Password, users.password)
        .then(matched=>{
            if (!matched){
                req.flash('userErr', 'Invalid username or password')
                console.log(matched)
                console.log(users.password)
                console.log(Password)
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

exports.logout = (req, res)=>{
    return req.session.destroy(()=>{
      res.redirect('/sign-in')
    })
  }

exports.dashBoard=(req,res)=>{
   let users= req.session.user
//    res.json(user.email)
    res.render('pages/index',{title:'Dashboard',Users:users} )
}

// reset password middleware 
exports.resetPasswordPage=(req,res)=>{
    let resetErr=req.flash('resetErr')
    let foundError=req.flash('foundErr')
    let passError=req.flash('passErr')
    res.render('pages/resetPassword', {title:"Reset password",PassError:passError,
     ValidError:resetErr,foundError:foundError})
}

exports.resetPassword=(req,res)=>{
    errors= validationResult(req);
    const {Email, OldPassword, NewPassword, ConfirmPassword}=req.body;
    if(!errors.isEmpty()){
        req.flash('resetErr', errors.array())
        return req.session.save(()=>{
            console.log("Helooooooooo")
         return   res.redirect('/reset-password')
           
        })
    }
    User.findOne({
        where:{
            email:Email
        }
    }).then(user=>{
        // console.log(user)
        if(!user){
            req.flash('foundErr', 'this email is not registered or does not exist')
            return req.session.save(()=>{
                res.redirect('/reset-password')
                console.log("Helooooooooo")
                return user
            })
        }
        bcrypt.compare(OldPassword,user.password).then(match=>{
            if(!match){
                req.flash('passErr', 'this password is incorrect')
                return req.session.save(()=>{
                    res.redirect('/reset-password')
                })
            }
            bcrypt.hash(NewPassword,12).then(hashedPassword=>{
                user.password=hashedPassword
            return user.save().then(result=>{
             return   res.redirect('/sign-in')
            })
            .catch(err=>{
                console.log(err)
            })
            })
            
        })
    })
}

// Forgot password middleware
exports.forgotPasswordPage=(req,res)=>{
    // let resetErr=req.flash('resetErr')
    let foundError=req.flash('userError')
    // let passErr=req.flash('errors')
    res.render('pages/forgotPassword', {title:"Forgot Password",PassError:req.flash('error'), foundError:req.flash('userError')})
}

exports.forgotPassword=(req,res)=>{
    const {Email}=req.body;
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        req.flash('error', errors.array())
        console.log(errors)
        return req.session.save(()=>{
            return res.redirect('/forgot-password')
        })
    }
    crypto.randomBytes(32, (err, buffer)=>{
        if(err){
            req.flash('userError', 'Unable to perform this function at the moment, try again later')
            req.session.save(()=>{
                res.redirect('/forgot-password')
            })
        }
        let token=buffer.toString('hex');
        User.findOne({
            where:{
                email:Email
            }
        }).then(user=>{
            if(!user){
                req.flash('userError', 'User does not exist');
                return req.session.save(()=>{
                    res.redirect('/forgot-password')
                })
            }
            user.resetToken = token;
            user.resetTokenExpiration = Date.now()  +90000000
            return user.save()
        }).then(user=>{
            let email = {
                to:[user.email,'kabirajibad@yahoo.com'],
                from:{
                    name:'O-Mart Stores',
                    email: 'info@0-martstores.com.ng'
                },
                subject: 'Retrieve Password',
                html: `
                <h2> Password retrieve </h2>
                <p> <a href="http:/localhost:3001/retrieve-password/${token}">Retrieve password</a> to retrieve your password </p>
                <p> this link will expire in the next 24 hours <br> Kindly ignore if you did not initiate this process</p>
                `
            }
            var transport=nodemailer.createTransport({
                host: "sandbox.smtp.mailtrap.io",
                port:2525,
                auth:{
                    user: "58b42af4ae2024",
                    pass: "822d08109dd72d"
                }
            })
            transport.sendMail(email).then((respons)=>{
                return res.redirect('/sign-in');
            }).catch(err=>{
                console.log(err)
            })
            return res.redirect('/sign-in')
        })
    })
}

exports.retrievePasswordPage=(req, res)=>{
    let token =req.params.token
    User.findOne({
        where:{
            resetToken:token
        }
    }).then(user=>{
        if(!user){
            req.flash('retrievePassword', 'Invalid URL')
            return req.session.save(()=>{
                res.redirect('/sign-in')
            })
        }
        if(user.resetTokenExpiration < Date.now()){
            req.flash('retrievePassword', 'URL has expired')
            return req.session.save(()=>{
                res.redirect('/sign-in')
            })
        }
        return res.render('pages/retrieve-password', {title:"Retrieve Passord", Person:user})
    })
}

exports.retrievePassword=(req,res)=>{
        const {Email, NewPassword, ConfirmPassword}=req.body;
        User.findOne({
            where:{
                email:Email
            }
        }).then(result=>{
            if(!result){
                req.flash('resetPass', 'Invalid user')
                return req.session.save(()=>{
                    res.redirect('/retrieve-password')
                })
            }
            bcrypt.hash(NewPassword, 12).then(hashedNewPassword=>{
                result.password=hashedNewPassword
                return result.save().then(result=>{
                    return res.redirect('/sign-in')
                })
            }).catch(err=>{
                console.log(err)
            })
        })
}