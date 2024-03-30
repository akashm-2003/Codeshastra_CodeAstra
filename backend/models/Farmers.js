const moongose = require("mongoose");
const Schema = moongose.Schema;

const orderSchema = new Schema({
  orderid: String,
  productid: String,
  quantity: Number,
  price: Number,
  productname: String,
  status: {
    type: String,
    enum: ["pending", "dispatched", "out for delivery", "delivered"],
    default: "pending",
  },
  orderdate: {
    type: Date,
    default: Date.now,
  },
  type: {
    type: String,
    enum: ["buy", "sell"],
  }
});

const farmerSchema = new Schema(
  {
    name: String,
    phone: String,
    state: String,
    income: Number,
    landsize: Number,
    debtrecords: {
      activeloans: Number,
      totaldebt: Number,
      creditscore: Number,
    },
    orders: {
      type: [orderSchema],
      default: [],
    },
  },
  { timestamps: true }
);

const Farmers = moongose.model("farmers", farmerSchema);
module.exports = Farmers;
