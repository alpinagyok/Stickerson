const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const path = require("path");

const users = require("./routes/api/users");
const stores = require("./routes/api/stores");
const products = require("./routes/api/products");
const reviews = require("./routes/api/reviews");
const orders = require("./routes/api/orders");
const sales = require("./routes/api/sales");

const app = express();

// Body parser middleware is not needed. express has it
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// DB Config
const db = process.env.MONGODB_URL || require("./config/keys").mongoURL;

// Connect to MongoDB
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Passport Middleware
app.use(passport.initialize());

// Passport Config
// we use strategies with passport (local strategy/oauth strategy/...)
// this is JWT strategy
require("./config/passport")(passport); // passing passport as param

// Use Routes
app.use("/api/users", users);
app.use("/api/stores", stores);
app.use("/api/products", products);
app.use("/api/reviews", reviews);
app.use("/api/orders", orders);
app.use("/api/sales", sales);

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
