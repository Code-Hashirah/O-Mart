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
        type:DataTypes.STRING(50),
        allowNull:false,
    }
});

module.exports=user