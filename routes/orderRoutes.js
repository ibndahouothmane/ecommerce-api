const router = require('express').Router();
const { body } = require('express-validator');
const validate = require('../middlewares/validate');
const controller = require('../controllers/orderController');

const orderValidation = [
  body('userId').isInt({ min: 1 }).withMessage('userId invalide'),
  body('items').isArray({ min: 1 }).withMessage('items doit être un tableau non vide'),
  body('items.*.productId').isInt({ min: 1 }).withMessage('productId invalide'),
  body('items.*.quantite').isInt({ min: 1 }).withMessage('quantite doit être >= 1'),
];

router.post('/', orderValidation, validate, controller.createOrder);
router.get('/:id', controller.getOrderById);
router.patch('/:id/status', [body('status').notEmpty()], validate, controller.updateStatus);

module.exports = router;
