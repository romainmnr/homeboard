/******************************************
*             Homeboard Server
*          M-Dev - Romain Meunier
******************************************/
"use strict"; 

const localStorage = require('./tools/LocalStorage');
const {evalDynValue} = require('./devices/EvalContext');


function SocketClient (socket) {


  this.socket = socket

  socket.on('disconnect', () => {
    console.log(`[Homeboard] [SocketClient::${socket.id}] [on::disconnect]`);
  });


  socket.on('getPages', (arg1) => {
    console.log(`[Homeboard] [SocketClient::${socket.id}] [on::getPages]`);
    let pages = localStorage.get('pages') || [];

    socket.emit('getPages.reply',  pages.map(e => {
      return {
        "id"      : e.id,
        "name"    : e.name,
        "icon"    : e.icon
      }
    }))
  });


  socket.on('getPage', pageId => {
    console.log(`[Homeboard] [SocketClient::${socket.id}] [on::getPage] ${pageId}`);
    let page = localStorage.get('pages').find(e => e.id === pageId);
    socket.emit('getPage.reply', page || {});
  })

  socket.on('playAction', (actionId) => {
    console.log(`[Homeboard] [SocketClient::${socket.id}] [on::playAction]`);

  });

  socket.on('calcDynamicValue', ({tileField, pageId, tileId}) => {
    console.log(`[Homeboard] [SocketClient::${socket.id}] [on::calcDynamicValue] ${pageId}  - ${tileField} - ${tileId}`);
    let page = localStorage.get('pages').find(e => e.id === pageId);
    if(!page) return false;
    let tile = page.tiles.find(e => e.id === tileId)
    if(!tile) return false;
    const value = evalDynValue(tile[tileField])
    socket.emit('calcDynamicValue.reply', {tileField, pageId, tileId, value: value})
  });


}


SocketClient.prototype.constructor = SocketClient
module.exports = SocketClient