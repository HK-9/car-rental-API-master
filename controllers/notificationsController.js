const UserModel = require('../models/userModel');
const BookingsModel = require('../models/bookingModel');
const CarsModel = require('../models/carModel');

exports.getallnotifications = async (req, res) => {
    try {
      const users = await UserModel.findOne({},{notifications:1,_id:0}).lean();
      let notifications = users;
      res.status(200).json({notifications:notifications,message:'successs'}); 
    } catch (error) {
        console.log(error);
      return res.status(400).json(error);
    }
  };

  exports.showNotifications = async (req,res) =>{
    try {
        
    } catch (error) {
        
    }
  }

  exports.getdashboard = async(req,res) => {
    try {
 
      const totalCount = await BookingsModel.aggregate([{
        $group:{
          _id:null,
          "TotalCount":{
            $sum:1
          }
        }
      }])

      const totalAmount = await BookingsModel.aggregate([
      {$group:{
          _id:null,
          "totalAmount":{
            $sum:"$totalAmount"
          }
        }}
      ])

      const userCount = await UserModel.aggregate([
        {$group:{
          _id:null,
          'userCount':{
            $sum:1
          }
        }}
      ])

      const carsCount = await CarsModel.aggregate([
        {$group:{
          _id:null,
          carsCount:{
            $sum:1 
          }
        }}
      ])
    
      // const eachDaySale = await orderModel.aggregate([{$match:{status:"delivered"}},{$group: {_id: {day: {$dayOfMonth: "$createdAt"},month: {$month: "$createdAt"}, year:{$year: "$createdAt"}},total: {$sum: "$grandTotal"}}}]).sort({_id:1})
      const eachDaySale = await BookingsModel.aggregate([{
        $group: {
          _id: {day: {$dayOfMonth: "$createdAt"},month: {$month: "$createdAt"}, year:{$year: "$createdAt"}},total: {$sum: "$totalAmount"}}}]).sort({_id:1})


      return res.status(200).json({message:'succuss',data:{totalCount,totalAmount,userCount,carsCount,eachDaySale}})

    } catch (error) {
      console.log(error)
      res.status(400).json({error})
    }
  }