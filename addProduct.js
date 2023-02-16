require("dotenv").config({ path: "./config/.env" });
console.log(!!process.env.DB_STRING)
const connectDB = require("./config/database");
const Product = require("./models/Product")
const clientPromise = connectDB();

async function run() {
    await clientPromise
    const product = new Product({
        name: ">_Bottoms/Spider Pants",

        image: "https://res.cloudinary.com/dtyc44fjq/image/upload/v1676508320/Clothing%20Store/Spider_uxdsua.jpg",

        cloudinaryId: "v1676508320",

        size: "large",

        category: "Bottoms",

        price: 10,
    })
    await product.save()
    console.log("added product successfully!")
    process.exit(0)
}

run()