const sequelize = require('../config/database');
const Category = require('./Category');
const Product = require('./Product');
const Order = require('./Order');
const OrderItem = require('./OrderItem');
const Tag = require('./Tag');

Category.hasMany(Product, { foreignKey: 'categoryId', onDelete: 'RESTRICT' });
Product.belongsTo(Category, { foreignKey: 'categoryId' });

Order.hasMany(OrderItem, { foreignKey: 'orderId', onDelete: 'CASCADE' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });

Product.hasMany(OrderItem, { foreignKey: 'productId', onDelete: 'RESTRICT' });
OrderItem.belongsTo(Product, { foreignKey: 'productId' });

Product.belongsToMany(Tag, { through: 'ProductTags', foreignKey: 'productId' });
Tag.belongsToMany(Product, { through: 'ProductTags', foreignKey: 'tagId' });

module.exports = { sequelize, Category, Product, Order, OrderItem, Tag };
