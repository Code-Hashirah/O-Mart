// importing libraries 
const express = require('express');
const sequelize=require('./database/db');
const path = require('path');
const app=express();
const flash =require('connect-flash');
const multer = require('multer');
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
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended:true}));
let storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, 'public/images')
    },
    filename:(req, file, cb)=>{
        cb(null, Date.now() + "-" + 'picture' + file.originalname)
    }
})
app.use(multer({storage: storage}).single('image'))
app.set('view engine', 'ejs')

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
app.use((req, res, next)=>{
    res.locals.isLoggedIn=req.session.isLoggedIn;
    res.locals.user=req.session.user
    next()
})
app.use(authRoute);
app.use(AdminRoute);
app.use(UserRoute);
app.use(ProductRoute);

// Listen to port 
// User.sync({alter:true})
sequelize.sync().then(()=>{
    app.listen(3001, ()=>{
        console.log('Connected to port 3001')
    })
})