const Sequelize = require('sequelize');
const sequelize= new Sequelize('mart', 'root', '', {
    host:'localhost',
    dialect:'mysql'
});

module.exports=sequelize;