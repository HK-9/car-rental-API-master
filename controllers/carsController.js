const Car = require("../models/carModel");
exports.getallcar = async (req, res) => {
  try {
    console.log("processing @gerallcars")
    const cars = await Car.find();
    res.status(200).send(cars);
  } catch (error) {
    return res.status(400).json(error);
  }
};

exports.addcar = async (req, res) => {
  try {
    const newCar = new Car(req.body);
    await newCar.save();
    res.send("Car added successfully");
  } catch (error) {
    return res.status(400).json(error);
  }
};

exports.editcar = async (req, res) => {
  try {

    const car = await Car.findById(req.body._id);
    car.name = req.body.name;
    car.image = req.body.image;
    car.fuelType = req.body.fuelType;
    car.rentPerHour = req.body.rentPerHour;
    car.capacity = req.body.capacity;
    car.category = req.body.category;
    await car.save();
    res.send("Car added successfully");

  } catch (error) {
    return res.status(400).json(error);
  }
};

exports.deletecar = async (req, res) => {
  try {
    await Car.findOneAndDelete({ _id: req.body.carid });

    res.send("Car deleted successfully");
  } catch (error) {
    return res.status(400).json(error);
  }
};
