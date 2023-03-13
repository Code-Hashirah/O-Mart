const sequelize=require('../database/db');
const {DataTypes}=require('sequelize');

const product=sequelize.define('products', {
    id:{
        type:DataTypes.INTEGER(11),
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    item:{
        type:DataTypes.STRING(50),
        allowNull:false,
    },
    price:{
        type:DataTypes.STRING(50),
        allowNull:false,
        unique:true
    },
    brand:{
        type:DataTypes.STRING(50),
        allowNull:true,
    },
    description:{
        type:DataTypes.STRING(50),
        allowNull:false,
    },
    image:{
        type:DataTypes.STRING(70),
        allowNull:false,
    },
    discount:{
        type:DataTypes.INTEGER(3),
        allowNull:true,
        unique:false,
    },
    category:{
        type:DataTypes.STRING(100),
        allowNull:true,
    }
});

module.exports=product