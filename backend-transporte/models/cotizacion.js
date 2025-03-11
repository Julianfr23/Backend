'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cotizacion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Cotizacion.init({
    origen: DataTypes.STRING,
    destino: DataTypes.STRING,
    precio: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Cotizacion',
  });
  return Cotizacion;
};