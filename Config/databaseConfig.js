const Sequelize = require('sequelize');
const database = new Sequelize({
    dialect: 'sqlite',
    storage: __dirname+'/../Database/ShooooppingCartDB.db'
  });
module.exports={
    database,Sequelize
}