const router = require('express').Router();
const { body } = require('express-validator');
const validate = require('../middlewares/validate');
const controller = require('../controllers/categoryController');

router.get('/', controller.getCategories);
router.post('/', [body('nom').notEmpty().withMessage('nom requis')], validate, controller.createCategory);

module.exports = router;
