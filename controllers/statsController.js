const { sequelize, Order, OrderItem, Product } = require('../models');

exports.getStats = async (req, res, next) => {
  try {
    const totalCommandes = await Order.count();
    const chiffreAffaires = await Order.sum('total') || 0;

    const best = await OrderItem.findOne({
      attributes: [
        'productId',
        [sequelize.fn('SUM', sequelize.col('quantite')), 'totalVendu'],
      ],
      include: [{ model: Product, attributes: ['id', 'nom'] }],
      group: ['productId', 'Product.id'],
      order: [[sequelize.literal('totalVendu'), 'DESC']],
    });

    res.json({
      totalCommandes,
      chiffreAffaires: Number(chiffreAffaires),
      produitPlusVendu: best ? { produit: best.Product, totalVendu: Number(best.get('totalVendu')) } : null,
    });
  } catch (err) { next(err); }
};
