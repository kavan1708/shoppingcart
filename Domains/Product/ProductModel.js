const database = require(__dirname+'/../../Config/databaseConfig.js').database;
const Sequelize = require(__dirname+'/../../Config/databaseConfig.js').Sequelize;
const Vendor=require(__dirname+'/../Vendor/VendorModel.js').Vendors;



  const Products = database.define('product', {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },  
    price:{
      type:Sequelize.DOUBLE,
      allowNull:false
    },
    quantity:{
      type:Sequelize.INTEGER,
      allowNull:false   
    },
    vendorname:{
      
        type: Sequelize.STRING,
        allowNull: false
    
    }
   
  })
  module.exports = {
   Products
}
