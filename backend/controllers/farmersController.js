const Farmers = require("../models/farmers");

const getFarmersByPhone = async (req, res, next) => {
  try {
    const phone = req.query.phone;
    if (phone.length !== 10) {
      return res.status(400).json({ message: "Enter valid phone number" });
    }
    const farmer = await Farmers.findOne({
      phone: phone,
    });
    if (!farmer) return res.status(200).json({ message: "Farmer not found" });
    res.send(farmer);
  } catch (error) {
    res.status(500).send(error);
  }
};

const addFarmer = async (req, res, next) => {
  const phone = req.body.phone;
  // if phone number length is not equal to 10 then return enter valid phone number
  console.log(phone.length);
  if (phone.length !== 10) {
    return res.status(400).json({ message: "Enter valid phone number" });
  }

  const farmerExists = await Farmers.findOne({
    phone: phone,
  });
  if (farmerExists) {
    return res.status(409).json({ message: "Farmer already exists" });
  }
  let farmer = new Farmers(req.body);
  console.log(farmer);
  try {
    await farmer.save();
    res.status(201).send(farmer);
  } catch (error) {
    res.status(400).send(error);
  }
};

const updateFarmer = async (req, res, next) => {
  try {
    const phone = req.query.phone;
    if (phone.length !== 10) {
      return res.status(400).json({ message: "Enter valid phone number" });
    }
    const farmer = await Farmers.findOneAndUpdate({ phone: phone }, req.body, {
      returnOriginal: false,
    });
    if (!farmer) return res.status(200).json({ message: "Farmer not found" });
    res.send(farmer);
  } catch (error) {
    res.status(400).send(error);
  }
};
const deleteFarmer = async (req, res, next) => {
  try {
    const phone = req.query.phone;
    if (phone.length !== 10) {
      return res.status(400).json({ message: "Enter valid phone number" });
    }
    const farmer = await Farmers.findOneAndDelete({ phone: phone });
    if (!farmer) return res.status(200).json({ message: "Farmer not found" });
    res.json({ message: "Farmer deleted", status: 200 });
  } catch (error) {
    res.status(400).send;
  }
};

const getAllOrders = async (req, res, next) => {
  try {
    const phone = req.query.phone;
    if (phone.length !== 10) {
      return res.status(400).json({ message: "Enter valid phone number" });
    }
    const farmer = await Farmers.findOne({ phone: phone });
    if (!farmer) return res.status(200).json({ message: "Farmer not found" });
    res.send(farmer.orders);
  } catch (error) {
    res.status(500).send(error);
  }
};

const addOrder = async (req, res, next) => {
  try {
    const phone = req.query.phone;
    if (phone.length !== 10) {
      return res.status(400).json({ message: "Enter valid phone number" });
    }
    const farmer = await Farmers.findOne({ phone: phone });
    if (!farmer) return res.status(200).json({ message: "Farmer not found" });
    farmer.orders.push({ ...req.body, orderid: farmer.orders.length + 1 });
    await farmer.save();
    res.json(farmer.orders);
  } catch (error) {
    res.status(500).send(error);
  }
};

// const updateOrder = async (req, res, next) => {
//   try {
//     const phone = req.query.phone;
//     if (phone.length !== 10) {
//       return res.status(400).json({ message: "Enter valid phone number" });
//     }
//     const farmer = await Farmers.findOne({ phone: phone });
//     if (!farmer) return res.status(200).json({ message: "Farmer not found" });
//     console.log(farmer.orders.or);
//     const order = farmer.orders.id(req.query.orderid);
//     if (!order) return res.status(200).json({ message: "Order not found" });
//     order.set(req.body);
//     await farmer.save();
//     res.send(order);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };

// const deleteOrder = async (req, res, next) => {
//   try {
//     const phone = req.query.phone;
//     if (phone.length !== 10) {
//       return res.status(400).json({ message: "Enter valid phone number" });
//     }
//     const farmer = await Farmers.findOne({ phone: phone });
//     if (!farmer) return res.status(200).json({ message: "Farmer not found" });
//     const order = farmer.orders.id(req.query.orderid);
//     if (!order) return res.status(200).json({ message: "Order not found" });
//     order.remove();
//     await farmer.save();
//     res.send(farmer.orders);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };

module.exports = {
  addFarmer,
  getFarmersByPhone,
  updateFarmer,
  deleteFarmer,
  getAllOrders,
  addOrder,
  // updateOrder,
  // deleteOrder,
};
