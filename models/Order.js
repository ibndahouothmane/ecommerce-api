const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Order = sequelize.define('Order', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  status: {
    type: DataTypes.ENUM('PENDING', 'CONFIRMED', 'SHIPPED', 'CANCELLED'),
    allowNull: false,
    defaultValue: 'PENDING',
  },
  total: { type: DataTypes.DECIMAL(10, 2), allowNull: false, defaultValue: 0 },
  userId: { type: DataTypes.INTEGER, allowNull: false },
}, {
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

module.exports = Order;
