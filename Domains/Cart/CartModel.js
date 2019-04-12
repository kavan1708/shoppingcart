const database = require(__dirname+'/../../Config/databaseConfig.js').database;
const Sequelize = require(__dirname+'/../../Config/databaseConfig.js').Sequelize;



  const Carts = database.define('Cart', {
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
    
  })
  module.exports = {
   Carts
}
