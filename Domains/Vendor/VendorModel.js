const database = require(__dirname+'/../../Config/databaseConfig.js').database;
const Sequelize = require(__dirname+'/../../Config/databaseConfig.js').Sequelize;
const Product=require(__dirname+'/../Product/ProductModel.js').Products;

  const Vendors = database.define('Vendor', {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },  
   
  })
 
  Product.belongsTo(Vendors);
  module.exports = {
   Vendors
}
