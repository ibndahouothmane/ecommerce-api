const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const OrderItem = sequelize.define('OrderItem', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  quantite: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1 } },
  prixUnitaire: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  orderId: { type: DataTypes.INTEGER, allowNull: false },
  productId: { type: DataTypes.INTEGER, allowNull: false },
});

module.exports = OrderItem;
