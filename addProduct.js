require("dotenv").config({ path: "./config/.env" });
console.log(!!process.env.DB_STRING)
const connectDB = require("./config/database");
const Product = require("./models/Product")
const clientPromise = connectDB();

async function run() {
    await clientPromise
    const product = new Product({
        name: "bob",

        image: "something",

        cloudinaryId: "124",

        size: "small",

        price: 200,
    })
    await product.save()
    console.log("added product successfully!")
    process.exit(0)
}

run()