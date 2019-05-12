module.exports = function (sequelize, Sequelize) {
  const WidgetExport = sequelize.define('widget', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    aluminum: {
      type: Sequelize.NUMERIC,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    cold_rolled_steel: {
      type: Sequelize.NUMERIC,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    galvanneal: {
      type: Sequelize.NUMERIC,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    glass: {
      type: Sequelize.NUMERIC,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    stainless_steel: {
      type: Sequelize.NUMERIC,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
  });
  return WidgetExport;
};