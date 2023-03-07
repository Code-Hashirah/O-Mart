const User=require('../../models/user')
 
exports.signUpPage=(req,res)=>{
    res.render('pages/register', {title:'Sign-Up'})
}

exports.sigUp=(req,res)=>{
    const {Email, Password}=req.body;
    let role="User";
    User.creat({
        email:Email,
        password:Password
    })
}