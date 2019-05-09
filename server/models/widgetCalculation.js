module.exports = function (sequelize, Sequelize) {

  const WidgetCalculationExport = sequelize.define('widget_calculation', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },

    calculation: {
      type: Sequelize.JSON,
      allowNull: false,
    },

    calculation_total: {
      type: Sequelize.JSON,
      allowNull: false,
    },

  })

  WidgetCalculationExport.associate = (models) => {
    WidgetCalculationExport.belongsTo(models.user, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })
  }

  return WidgetCalculationExport;

}
