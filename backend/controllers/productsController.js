const Products = require("../models/Products");

const addProduct = async (req, res, next) => {
  const productid = req.body.productid;
  const productExists = await Products.findOne({
    productid: productid,
  });
  if (productExists) {
    return res.status(409).json({ message: "Product already exists" });
  }
  // increment the productid by 1 using the length of the products
  let product = new Products({
    ...req.body,
    productid: (await Products.find()).length + 1,
  });
  try {
    await product.save();
    res.status(201).send(product);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getProductsByProductId = async (req, res, next) => {
  try {
    const productid = req.query.productid;
    const product = await Products.findOne({
      productid: productid,
    });
    if (!product) return res.status(200).json({ message: "Product not found" });
    res.send(product);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  addProduct,
  getProductsByProductId,
};
