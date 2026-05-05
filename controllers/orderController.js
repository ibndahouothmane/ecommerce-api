const { sequelize, Order, OrderItem, Product } = require('../models');

exports.createOrder = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    const { userId, items } = req.body;
    let total = 0;
    const lines = [];

    for (const item of items) {
      const product = await Product.findByPk(item.productId, { transaction, lock: transaction.LOCK.UPDATE });
      if (!product) {
        const err = new Error(`Produit ${item.productId} introuvable`);
        err.status = 400;
        throw err;
      }

      if (product.stock < item.quantite) {
        const err = new Error(`Stock insuffisant pour ${product.nom}: demandé ${item.quantite}, disponible ${product.stock}`);
        err.status = 400;
        throw err;
      }

      const prixUnitaire = Number(product.prix);
      total += prixUnitaire * item.quantite;
      lines.push({ product, quantite: item.quantite, prixUnitaire });
    }

    const order = await Order.create({ userId, total }, { transaction });

    for (const line of lines) {
      await OrderItem.create({
        orderId: order.id,
        productId: line.product.id,
        quantite: line.quantite,
        prixUnitaire: line.prixUnitaire,
      }, { transaction });

      await line.product.decrement('stock', { by: line.quantite, transaction });
    }

    await transaction.commit();

    const created = await Order.findByPk(order.id, {
      include: { model: OrderItem, include: Product },
    });
    res.status(201).json(created);
  } catch (err) {
    await transaction.rollback();
    next(err);
  }
};

exports.getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: { model: OrderItem, include: Product },
    });
    if (!order) return res.status(404).json({ message: 'Commande introuvable' });
    res.json(order);
  } catch (err) { next(err); }
};

exports.updateStatus = async (req, res, next) => {
  try {
    const allowed = ['PENDING', 'CONFIRMED', 'SHIPPED', 'CANCELLED'];
    if (!allowed.includes(req.body.status)) return res.status(400).json({ message: 'Statut invalide' });

    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ message: 'Commande introuvable' });

    await order.update({ status: req.body.status });
    res.json(order);
  } catch (err) { next(err); }
};
