require("dotenv").config({ path: "./config/.env" });
console.log(!!process.env.DB_STRING)
const connectDB = require("./config/database");
const Product = require("./models/Product")
const clientPromise = connectDB();

async function run() {
    await clientPromise
    const product = new Product({
        name: ">_Tops/Link T-Shirt",

        image: "https://res.cloudinary.com/dtyc44fjq/image/upload/v1668982102/Clothing%20Store/FRONT6-Black_boiabd.jpg",

        cloudinaryId: "v1668982102",

        size: "large",

        category: "Tops",

        price: 10,
    })
    await product.save()
    console.log("added product successfully!")
    process.exit(0)
}

run()