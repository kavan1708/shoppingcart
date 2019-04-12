const database = require(__dirname+'/../../Config/databaseConfig.js').database;
const Sequelize = require(__dirname+'/../../Config/databaseConfig.js').Sequelize;
const Product=require(__dirname+'/../Product/ProductModel.js').Products;
const Cart=require(__dirname+'/../Cart/CartModel.js').Carts;

  const Users = database.define('user', {
    firstname: {
      type: Sequelize.STRING,
      allowNull: false
    },  
    lastname:{
      type: Sequelize.STRING,
      allowNull:false
    },
    email:{
      type: Sequelize.STRING,
      allowNull:false,
      unique:true
    },
    password:{
        type: Sequelize.STRING,
        allowNull:false,   
    }
  })

  Product.belongsToMany(Users,{through : Cart});
  Users.belongsToMany(Product, {through : Cart});

  module.exports = {
   Users
}
