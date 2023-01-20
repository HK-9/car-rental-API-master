const UserModel = require('../models/userModel')
utils = {
    getUser: async function (userId){
        try {
            user = await UserModel.findOne({_id:userId});
            return user
            
        } catch (error) {
            console.log(error)
           return res.status(401).json(error)
        }   
    }
}
module.exports = utils;