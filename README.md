# Character Select

**A retro-themed online clothing store built with Node.js, Express, and MongoDB.**

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![EJS](https://img.shields.io/badge/EJS-B4CA65?style=flat&logo=ejs&logoColor=black)](https://ejs.co/)

![Character Select demo](https://res.cloudinary.com/dtyc44fjq/image/upload/v1678075789/Clothing%20Store/chrome_st6gn1WmdZ_jrjvvo.gif)

Shoppers browse tops and bottoms, pick a size, and build a cart tied to their account. Pages are rendered on the server with EJS. The shop pages are styled with a custom retro stylesheet, and the login, signup, and profile pages use Bootstrap.

## Highlights

- Passport.js login with bcrypt-hashed passwords and a pre-filled guest login
- Sessions stored in MongoDB, so logins survive server restarts
- Per-user carts that track size variants, incrementing quantities in place with MongoDB's `$inc`

## How It Works

**Structure:** Express routes hand requests to controllers (auth, products, cart, checkout, profile), which read and write three Mongoose models: `User`, `Product`, and `Cart`.

**Products:** each size of an item is its own product document, so the cart stores exactly which size was chosen. Images are hosted on Cloudinary.

**Cart updates:** each user gets a cart document, created the first time they open a shop page. Adding an item that's already in it increments that entry's quantity in place:

```js
await Cart.findOneAndUpdate(
  { userId: req.user.id, items: { $elemMatch: { id: currentProduct.id } } },
  { $inc: { "items.$.qty": 1 } },
);
```

The positional `$` operator targets the matching array element, so MongoDB increments that entry's quantity in place instead of the app rewriting the cart. Removing an item uses `$inc: -1` while its quantity is above one; removing the last unit filters the entry out of the cart's items array.

## Getting Started

**Prerequisites:** Node.js 18+ and a MongoDB database. Any MongoDB works: a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster, a local install, or Docker:

```bash
docker run -d --name cs-mongo -p 27017:27017 mongo:7
```

```bash
git clone https://github.com/r-Dev03/character-select.git
cd character-select
npm install
cp config/.env.example config/.env
```

Fill in `config/.env`. Use your Atlas connection string for `DB_STRING` if you're not running MongoDB locally, and any long random string for `SESSION_SECRET` (for example, the output of `openssl rand -hex 32`):

```env
DB_STRING=mongodb://localhost:27017/character-select
PORT=3000
SESSION_SECRET=any_long_random_string
```

Then run `npm start` (or `npm run dev` for auto-reload) and open `http://localhost:3000`.

- **Adding products:** edit the details in `addProduct.js`, then run `node addProduct.js`.
- **Guest login:** the **Continue As Guest** button on the signup page opens the login form pre-filled with `Guest@gmail.com` / `GuestUser`. On a fresh database, sign up with those credentials once first.

## Tech Stack

Node.js · Express · MongoDB / Mongoose · Passport.js · bcrypt · express-session / connect-mongo · EJS · Bootstrap 5 · Cloudinary (image hosting)

## Known Limitations

- **No payment step.** The checkout page is a placeholder: carts persist, but nothing is charged.
- **Products are added by script.** There's no admin page for managing inventory.
