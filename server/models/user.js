// 12.11 Google Authentication Model
/* Just like all other models - Models represent a collection
    We can use this model to interact with the collection to do stuff like:
        save recoreds, retrieve records, update them 

*/

module.exports = function (sequelize, Sequelize) {
    
  const UserExport = sequelize.define('user', {

      id: {
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
      },

      username: {
          type: Sequelize.STRING,
          allowNull: false,
      },

      googleId: {
          type: Sequelize.STRING,
          allowNull: false,
      },

      // If we want to use the field below, not mandatory
      last_login: {
          type: Sequelize.DATE
      },

      // If we want to use the field below, not mandatory
      status: {
          type: Sequelize.ENUM('active', 'inactive'),
          defaultValue: 'active'
      }

      })

      // Future: make a widget calculation model that you can save and dsiplay on your profile
      
      // UserExport.associate = (models) => {
      //   UserExport.hasMany(models.widgetCalculation, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })
      // }

  return UserExport;

}