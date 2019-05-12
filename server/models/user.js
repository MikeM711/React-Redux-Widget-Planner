module.exports = function (sequelize, Sequelize) {
  const UserExport = sequelize.define('user', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
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
    googleName: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING,
      // allowNull: false,
      // Above is commented out, because a user may sign in with OAuth
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
  });
  return UserExport;
};
