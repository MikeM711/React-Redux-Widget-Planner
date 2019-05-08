module.exports = function (sequelize, Sequelize) {
  
    const UserExport = sequelize.define('user', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },

        // Optional for myself:
        method: {
            type: Sequelize.ENUM('local', 'google'),
            allowNull: false,
        },

        googleId: {
            type: Sequelize.STRING,
        },

        googleEmail: {
            type: Sequelize.STRING,
            validate: { 
                isLowercase: true,
                isEmail: true,
            }
        },
   
        email: {
            type: Sequelize.STRING,
            // allowNull: false,
            // Above is commented out because a user may sign in with OAuth
            // All incoming emails will be converted to lowercase, before sent to database
            validate: { 
                isLowercase: true,
                isEmail: true,
            }
        },
   
        password: {
            type: Sequelize.STRING,
            // allowNull: false,
            // Above is commented out because a user may sign in with OAuth

        },
   
        })
   
        // Future: make a widget calculation model that you can save and display on your profile
       
        // UserExport.associate = (models) => {
        //   UserExport.hasMany(models.widgetCalculation, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })
        // }
   
    return UserExport;
   
   }
   