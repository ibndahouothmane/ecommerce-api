const { UniqueConstraintError, ForeignKeyConstraintError, ValidationError } = require('sequelize');

function errorHandler(err, req, res, next) {
  console.error(err);

  if (err instanceof UniqueConstraintError) {
    return res.status(409).json({ message: 'Valeur déjà utilisée', details: err.errors.map(e => e.message) });
  }

  if (err instanceof ForeignKeyConstraintError) {
    return res.status(400).json({ message: 'Référence étrangère invalide' });
  }

  if (err instanceof ValidationError) {
    return res.status(400).json({ message: 'Erreur de validation Sequelize', details: err.errors.map(e => e.message) });
  }

  if (err.status) {
    return res.status(err.status).json({ message: err.message });
  }

  return res.status(500).json({ message: 'Erreur serveur' });
}

module.exports = errorHandler;
