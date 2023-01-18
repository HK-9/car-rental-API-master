const Booking = require("../models/bookingModel");
const Car = require("../models/carModel");
const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")("sk_test_51MAsKUSBVpln2MKoraGh5vujdEZqv2qPGAGKy1EI4TL1NXeCjFVErD6OL569MWY4WCyUcENd6s62GqqCYCaETz1A00vFQlPiJ4");
const {sendNotification} = require('../utils/notifications-utils');
const utils = require('../utils/utils')

exports.booking = async (req, res) => {
  const user = await utils.getUser(req.body.decoded.id)
    const { token } = req.body;
    const userId = req.body.user
    try {
      const customer = await stripe.customers.create({
        email: token.email,
        source: token.id,
      });
  
      const payment = await stripe.paymentIntents.create(
        {
          amount: req.body.totalAmount * 100,
          currency: "inr",
          customer: customer.id,
          receipt_email: token.email,
          payment_method_types: ["card"],
        },
        {
          idempotencyKey: uuidv4(),
        }
      );
      if (payment) {
        req.body.transactionId = payment.id;
        const newbooking = new Booking(req.body);
        await newbooking.save();
        const currentBooking = await Booking.findOne({
          transactionId: req.body.transactionId,
        }); //to add booking id to the car's model.
        const car = await Car.findOne({ _id: req.body.car });
        const bookedTimeSlots = car.bookedTimeSlotes[0];
        const from = req.body.bookedTimeSlots.from;
        const to = req.body.bookedTimeSlots.to;
        const carModel = await car.save();
        carModel.bookedTimeSlotes.push({
          bookingId: currentBooking._id,
          from: from,
          to: to,
        });
        await carModel.save();
        sendNotification(userId,{
          type:'booking',
          text:'booking update! @'+ user.username + ' booked a cab from the fleet',
          path:'/bookings'
        })
        res.send("Your booking is successfull");
      } else {
        return res.status(400).json(error);
      }
    } catch (error) {
      console.log("booking route error", error);
      return res.status(400).json(error);
    }
  };
  