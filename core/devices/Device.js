/******************************************
*             Homeboard Server
*          M-Dev - Romain Meunier
******************************************/
"use strict";

function Device(object){
  //-- init object from JSON
  this.id         = object.id;
  this.moduleName = object.moduleName;
  this.config     = object.config

}

Device.prototype.init = async function(){
  return this;
};






Device.prototype.constructor = Device;
module.exports = Device