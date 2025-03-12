'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cotizacion extends Model {
    static associate(models) {
    }
  }
  Cotizacion.init({
    origen: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    destino: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    precio: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isDecimal: true,
        min: 0,
      },
    },
  },
    {
      sequelize,
      modelName: 'Cotizacion',
      tableName: 'cotizaciones', 
      timestamps: true, 
    }
  );
  return Cotizacion;
};
