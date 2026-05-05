const express = require('express');
const { sequelize } = require('./models');
const errorHandler = require('./middlewares/errorHandler');

const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const statsRoutes = require('./routes/statsRoutes');

const app = express();
app.use(express.json());

app.get('/', (req, res) => res.json({ message: 'API e-commerce Sequelize OK' }));
app.use('/categories', categoryRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/stats', statsRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

async function start() {
  await sequelize.authenticate();
  await sequelize.sync({ alter: true });
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}

start().catch(err => {
  console.error('Erreur démarrage:', err);
  process.exit(1);
});
