const Room = require('../models/room.model');
const User = require('../models/user.model');
const Message = require('../models/message.model');
const Response = require('../helpers/response.helper');

module.exports = {
  saveMess: async (messenger, roomId, userId) => {
    return await Message.create({
      idRoom: roomId,
      idUser: userId,
      messageBody: messenger
    })
  },
};