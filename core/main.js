#!/usr/bin/env node
/******************************************
*             Homeboard Server
*          M-Dev - Romain Meunier
******************************************/
"use strict"; 
console.log('[Homeboard] Starting backend...')


//-------------------------------
//-- Handle Process errors event
//-------------------------------

process.on('exit', code => { 
  //localStorage.store()
  console.error('[Homeboard][Process] EXIT : Process exit with code ' + code)
});

process.on('SIGINT', () => { 
  console.error('[Homeboard][Process] SIGINT : Process has been closed.')
  process.exit(1);
});

process.on('uncaughtException', err => {
  console.error('[Homeboard][Process] UncaughtException :', err)
});

process.title = "homeboard-server"
//-------------------------------

global._devices = [];

const {init, get} = require('./tools/LocalStorage');
const httpServer  = require('./servers/http');
const ioServer    = require('./servers/socket')(httpServer);
const Device      = require('./devices/Device');
const Matrix      = require('./devices/Matrix');


function initDevice (object){
  let o;
  switch (object.moduleName) {
    
    case 'Matrix':  
    o = new Matrix(object)
    break;
    
    case 'Device':  
    default:
    o = new Device(object)
    break;
  }
  o.init()
  return o;
}

init(()=>{
  
  global._devices = get('devices').map(e => initDevice(e));
  console.log(global._devices)
  
})

