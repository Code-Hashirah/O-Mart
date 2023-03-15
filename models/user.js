const sequelize=require('../database/db');
const {DataTypes}=require('sequelize');

const user=sequelize.define('users', {
    id:{
        type:DataTypes.INTEGER(11),
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    name:{
        type:DataTypes.STRING(50),
        allowNull:true,
    },
    email:{
        type:DataTypes.STRING(50),
        allowNull:false,
        unique:true
    },
    role:{
        type:DataTypes.STRING(50),
        allowNull:false,
    },
    password:{
        type:DataTypes.STRING(100),
        allowNull:false,
    },
    image:{
        type:DataTypes.STRING(70),
        allowNull:true,
    },
    phone:{
        type:DataTypes.INTEGER(11),
        allowNull:true,
    },
    resetToken: DataTypes.STRING,
    resetTokenExpiration: DataTypes.DATE
});

module.exports=user