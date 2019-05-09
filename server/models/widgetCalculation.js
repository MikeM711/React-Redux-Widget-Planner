module.exports = function (sequelize, Sequelize) {

  const WidgetCalculationExport = sequelize.define('widget_calculation', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },

    calculation: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: false,
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

  })

  // Future: make a widget calculation model that you can save and display on your profile

  WidgetCalculationExport.associate = (models) => {
    WidgetCalculationExport.belongsTo(models.user, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })
  }

  return WidgetCalculationExport;

}
