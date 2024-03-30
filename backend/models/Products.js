const moongose = require("mongoose");
const Schema = moongose.Schema;

const productSchema = new Schema({
  productid: String,
  productname: String,
  price: Number,
  dealerName: String,

  status: {
    type: String,
    enum: ["available", "outofstock"],
    default: "available",
  },
  type: {
    type: String,
    enum: [
      "seeds",
      "fertilizers",
      "pesticides",
      "tools",
      "machinery",
      "others",
    ],
  },
});

const Products = moongose.model("products", productSchema);
module.exports = Products;
