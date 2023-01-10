const UserModel = require('../models/userModel')

utils = {
    getUser: async function (userId){   
        user = UserModel.findOne({_id:userId});
        return user
    }
}
module.exports = utils;