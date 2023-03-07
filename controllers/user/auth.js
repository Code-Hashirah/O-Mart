const User=require('../../models/user')
 
exports.signUpPage=(req,res)=>{
    res.render('pages/register', {title:'Sign-Up'})
}

exports.sigUp=(req,res)=>{
    const {Email, Password}=req.body;
    let Role="User";
    User.creat({
        email:Email,
        password:Password,
        role:role,
    }).then(user=>{
        res.redirect('/sign-in')
    }).catch(err=>{
        console.log(err);
    })
}