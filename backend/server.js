const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const FarmersRoute = require("./routes/farmersroute");
const Products = require("./models/Products");
const ProductsRoute = require("./routes/productsroute");
// mongoose.connect("mongodb://127.0.0.1:27017/codeshastra");
// akashmanna318
// NE2yMmJLnyoXgMaS
mongoose.connect(
  "mongodb+srv://akashmanna318:NE2yMmJLnyoXgMaS@codeshashtra.eygwsul.mongodb.net/Codeshastra?retryWrites=true&w=majority&appName=Codeshashtra"
);

const db = mongoose.connection;

db.on("error", (err) => {
  console.log(err);
});

db.once("open", () => {
  console.log("Database connection established");
});

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;
app.use("/api", FarmersRoute);
app.use("/api", ProductsRoute);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
