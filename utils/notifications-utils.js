const UserModel = require("../models/userModel");
const { customId } = require("../utils/customId-utils");



const sendNotification = async (userId, message) => {  
    try {
      let homingPegeon = {
        ...message, //type,text,path
        msgId: customId(6, "HK"),
        time: new Date(),
        status: false,
      };
      await UserModel.updateOne({ userId }, {
        $push: {
            notifications: homingPegeon 
        }
    }).then(() => {
        return 
    })
    } catch (error) {
        console.log(error)   
    }
}
    
const viewNotification = (msgId, userId) => {
  UserModel.updateOne(
    { userId, "notifications.msgId": msgId },
    {
      $set: {
        "notifications.$.status": true,
      },
    }
  ).then(() => {
    return;
  });
};

module.exports = { sendNotification, viewNotification };
