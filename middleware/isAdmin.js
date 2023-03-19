module.exports=(req,res, next)=>{
    if(req.session.user.role != 'Admin'){
        return res.redirect('/')
    }
    // else{
    //   return   res.redirect('/admin-dashboard')
    // }
   
    next()
    // res.redirect('/admin-dashboard')
}
// 