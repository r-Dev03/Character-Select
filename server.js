const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")
const methodOverride = require("method-override");
const flash = require("express-flash");
const logger = require("morgan");
const connectDB = require("./config/database");
const mainRoutes = require("./routes/main");
const profileRoutes = require("./routes/profile")
const topRoutes = require("./routes/tops")
const bottomRoutes = require("./routes/bottoms")
const supportRoutes = require("./routes/support")
const checkoutRoutes = require("./routes/checkout")
const cartRoutes = require("./routes/cart")
const productRoutes = require("./routes/product")

//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

// Passport config
require("./config/passport")(passport);

//Connect To Database
// const clientPromise = connectDB();
connectDB();

//Using EJS for views
app.set("view engine", "ejs");

//Static Folder
app.use(express.static("public"));

//Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Logging
app.use(logger("dev"));

//Use forms for put / delete
app.use(methodOverride("_method"));

// Setup Sessions - stored in MongoDB
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({mongoUrl : process.env.DB_STRING}),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Use flash messages for errors, info, ect...
app.use(flash());

//Setup Routes For Which The Server Is Listening
app.use("/", mainRoutes);
app.use("/profile", profileRoutes)
app.use("/tops", topRoutes)
app.use("/bottoms", bottomRoutes)
app.use("/support", supportRoutes)
app.use("/checkout", checkoutRoutes)
app.use("/cart", cartRoutes)
app.use("/product", productRoutes)

//Server Running
app.listen(process.env.PORT, () => {
  console.log("Server is running, you better catch it!");
});
