"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let ioInstance;
const setSocketInstance = (io) => {
    ioInstance = io;
};
const getSocketInstance = () => {
    return ioInstance;
};
module.exports = { setSocketInstance, getSocketInstance };
