const router = require('express').Router();
const { body } = require('express-validator');
const validate = require('../middlewares/validate');
const controller = require('../controllers/productController');

const productValidation = [
  body('nom').notEmpty().withMessage('nom requis'),
  body('prix').isFloat({ min: 0 }).withMessage('prix doit être >= 0'),
  body('stock').isInt({ min: 0 }).withMessage('stock doit être >= 0'),
  body('categoryId').isInt({ min: 1 }).withMessage('categoryId invalide'),
];

router.get('/', controller.getProducts);
router.get('/:id', controller.getProductById);
router.post('/', productValidation, validate, controller.createProduct);
router.put('/:id', controller.updateProduct);
router.delete('/:id', controller.deleteProduct);

module.exports = router;
