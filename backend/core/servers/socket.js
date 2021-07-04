/******************************************
*             Homeboard Server
*          M-Dev - Romain Meunier
******************************************/
"use strict"; 

const Server = require('socket.io');
const SocketClient = require('../SocketClient');

console.log('[Homeboard] [SocketServer] Starting ...')

const options = {
  path: '/socket'
}
let clients = [];
let ioServer;


module.exports = (httpServer) => {
  ioServer = new Server(httpServer, options);

  ioServer.on('connection', (socket) => {
    console.log('[Homeboard] [SocketServer] [on::connection]');

    clients.push(new SocketClient(socket));
  });
  

  return ioServer;
}