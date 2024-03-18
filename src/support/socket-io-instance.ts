import { Server as SocketIOServer } from 'socket.io';

let ioInstance : SocketIOServer;

const setSocketInstance = (io : SocketIOServer) => {
  ioInstance = io;
};

const getSocketInstance = ():SocketIOServer => {
  return ioInstance;
};

module.exports = { setSocketInstance, getSocketInstance };