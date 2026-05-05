# API e-commerce Sequelize

API Express + Sequelize avec catégories, produits, commandes, items, tags, validations et gestion d'erreurs centralisée.

## Lancement local avec SQLite

```bash
npm install
cp .env.example .env
npm start
```

L'API démarre sur : `http://localhost:3000`

## Lancement avec Docker + PostgreSQL

```bash
docker compose up --build
```

L'API démarre sur : `http://localhost:3000`

PostgreSQL est exposé sur : `localhost:5432`

Identifiants par défaut :

```env
DB_NAME=ecommerce
DB_USER=postgres
DB_PASSWORD=postgres
```

Pour arrêter et supprimer le volume PostgreSQL :

```bash
docker compose down -v
```

## Endpoints principaux

- `GET /categories`
- `POST /categories`
- `GET /products?category=1&minPrice=10&maxPrice=100&page=1`
- `GET /products/:id`
- `POST /products`
- `PUT /products/:id`
- `DELETE /products/:id`
- `POST /orders`
- `GET /orders/:id`
- `PATCH /orders/:id/status`
- `GET /stats`

Voir `api.http` pour les requêtes de test complètes.
