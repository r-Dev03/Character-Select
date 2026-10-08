// Loads the guest account and the product catalog into the database.
// Safe to run any number of times: it only adds what's missing.
const User = require("./models/User");
const Product = require("./models/Product");
const catalog = require("./seed/products.json");

const GUEST = { userName: "Guest", email: "guest@gmail.com", password: "GuestUser" };
const SIZES = ["small", "medium", "large"];

async function seedGuest() {
  const existing = await User.findOne({ email: GUEST.email });
  if (existing) return;
  await new User(GUEST).save(); // the User pre-save hook hashes the password
  console.log("Seed: created guest account");
}

// Each size of an item is its own product document, so every catalog
// entry becomes one document per size
async function seedProducts() {
  let added = 0;
  for (const item of catalog) {
    for (const size of SIZES) {
      const result = await Product.updateOne(
        { name: item.name, size },
        { $setOnInsert: { ...item, size } },
        { upsert: true }
      );
      added += result.upsertedCount;
    }
  }
  if (added) console.log(`Seed: added ${added} products`);
}

async function seed() {
  try {
    await seedGuest();
    await seedProducts();
  } catch (err) {
    console.error("Seed failed:", err);
  }
}

module.exports = seed;

// `npm run seed` runs this file directly
if (require.main === module) {
  require("dotenv").config({ path: "./config/.env" });
  require("./config/database")()
    .then(seed)
    .then(() => process.exit(0));
}
