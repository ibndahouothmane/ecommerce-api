const { Op } = require('sequelize');
const { Product, Category, OrderItem } = require('../models');

exports.getProducts = async (req, res, next) => {
  try {
    const { category, minPrice, maxPrice, page = 1 } = req.query;
    const limit = 10;
    const offset = (Number(page) - 1) * limit;
    const where = {};

    if (category) where.categoryId = category;
    if (minPrice || maxPrice) {
      where.prix = {};
      if (minPrice) where.prix[Op.gte] = Number(minPrice);
      if (maxPrice) where.prix[Op.lte] = Number(maxPrice);
    }

    const result = await Product.findAndCountAll({
      where,
      include: Category,
      limit,
      offset,
      order: [['id', 'ASC']],
    });

    res.json({ page: Number(page), totalPages: Math.ceil(result.count / limit), count: result.count, data: result.rows });
  } catch (err) { next(err); }
};

exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id, { include: Category });
    if (!product) return res.status(404).json({ message: 'Produit introuvable' });
    res.json(product);
  } catch (err) { next(err); }
};

exports.createProduct = async (req, res, next) => {
  try {
    const category = await Category.findByPk(req.body.categoryId);
    if (!category) return res.status(400).json({ message: 'categoryId inexistant' });

    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) { next(err); }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: 'Produit introuvable' });

    if (req.body.categoryId) {
      const category = await Category.findByPk(req.body.categoryId);
      if (!category) return res.status(400).json({ message: 'categoryId inexistant' });
    }

    await product.update(req.body);
    res.json(product);
  } catch (err) { next(err); }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: 'Produit introuvable' });

    const used = await OrderItem.count({ where: { productId: product.id } });
    if (used > 0) return res.status(409).json({ message: 'Impossible de supprimer: produit présent dans une commande' });

    await product.destroy();
    res.status(204).send();
  } catch (err) { next(err); }
};
