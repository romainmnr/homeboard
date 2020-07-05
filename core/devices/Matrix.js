/******************************************
*             Homeboard Server
*          M-Dev - Romain Meunier
******************************************/
"use strict";
const axios = require('axios');
const Device = require('./Device');

function Matrix(object){
  Device.call(this, object);

  this.host = this.config.host;
  
  this.runningAction        = "off";
  this.runningActionParams  = [];
  this.delay                = 100;
  this.brightness           = 1; 
  this.currentColor         = [255, 255, 255, 255];
  this.randomColor          = false

}
//-- Inheritance of the object - Must be right after the constructor
Matrix.prototype = Object.create(Device.prototype);
Matrix.prototype.constructor = Matrix;
//---


Matrix.prototype.init = async function(){
  try {
    const response = await axios.get(this.host, {
      params:{type:'json'}
    });
    Object.assign(this, response.data);
  } catch (error) {
    console.error('[Matrix::init] Error', error);
  }
  return this;
};





module.exports = Matrix