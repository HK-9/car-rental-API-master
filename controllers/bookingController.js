const Booking = require("../models/bookingModel");
const Car = require("../models/carModel");
const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")(
  "sk_test_51MAsKUSBVpln2MKoraGh5vujdEZqv2qPGAGKy1EI4TL1NXeCjFVErD6OL569MWY4WCyUcENd6s62GqqCYCaETz1A00vFQlPiJ4"
);

exports.getallbookings = async (req, res) => {
  try {
    console.log('getallbookings/req.body.decoded:',req.query.user.decoded.id)
    if(!req.query.user) return res.status(401).json({message:'unothorized:Login again'})
    const userId = req.query.user.decoded.id;
    const bookings = await Booking.find({user:userId}).populate("car").lean();
    res.status(200).send(bookings);
  } catch (error) {
    console.log(error)
    return res.status(400).json(error);
  }
};

exports.cancelbooking = async (req, res) => {
  const { bookingid, carid } = req.body;
  try {
    const booking = await Booking.findById(bookingid);
    booking.status = "cancelled";
    await booking.save();

    const car = await Car.findById(carid);
    const bookedSlotes = car.bookedTimeSlotes;
    const temp = bookedSlotes.filter((e) => e.bookingId == bookingid);
    car.bookedTimeSlotes = temp;
    car.save();
    booking.save();
    res.send("booking cancelled successfully");
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};
