// socketMiddleware.js

const ErrorHander = require("../utils/errorhander");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");


const socketIo = (http) => {
  const io = require('socket.io')(http, {
    cors: {
      origin: '*', // Replace with your front-end URL
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });
  io.use(async (socket, next) => {
    const token = socket.handshake.headers.cookie?.split('=')[1];
    console.log(token);
    if (!token) {
      return next(new ErrorHander("Please Login to access this resource", 401));
    }
    try {
      const decodedData = jwt.verify(token, process.env.JWT_SECRET);
      socket.decoded = decodedData;
      const user = await User.findById(decodedData.id);
      if (!user || user.role !== "admin") {
        return next(new ErrorHander('Authentication Role error'));
      }
      next();
    } catch (err) {
      return next(new ErrorHander('Authentication error'));
    }
  });

  io.on('connection', (socket) => {
    console.log('A client has connected.');

    socket.on('disconnect', () => {
      console.log('A client has disconnected.');
    });

    socket.on('sendNotification', async (recipient, message) => {
      io.to(recipient).emit('notification', { message });
      console.log('Notification was received by the client:', message);
    });
    
  });

  return io;
};

module.exports = socketIo;
