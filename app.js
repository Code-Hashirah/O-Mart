// importing libraries 
const express = require('express');
const sequelize=require('./database/db');
const path = require('path');
const app=express();
const flash =require('connect-flash');
const User=require('./models/user')
const Product=require('./models/products')
const authRoute=require('./routes/authRoute')
const ProductRoute=require('./routes/productRoute')
const AdminRoute=require('./routes/adminRoute')
const UserRoute=require('./routes/userRoute')
const session =require('express-session')
const SequelizeStore=require('connect-session-sequelize')(session.Store)
const Session=require('./models/session')
// const {validatorResult}=require('express-validator')
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended:true}));
app.use(flash())
app.use(session({
    secret:'our secret',
    resave:false,
    saveUninitialized:false,
    store: new SequelizeStore({
        db:sequelize,
    }),
    cookie:{}
}))


// Page middleware
app.use(authRoute);
app.use(AdminRoute);
app.use(UserRoute);
app.use(ProductRoute);
app.use((req,res)=>{
    res.locals.isLoggedIn=req.session.isLoggedIn
    res.locals.User
})
// Listen to port 
// Product.sync({force:true})
sequelize.sync().then(()=>{
    app.listen(3001, ()=>{
        console.log('Connected to port 3001')
    })
})